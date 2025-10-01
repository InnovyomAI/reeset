"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useMemo, useRef } from "react";
import "@/styles/CircularGallery.css";

type CircularGalleryItem = {
  image: string;
  text: string;
};

type GLContext = Renderer["gl"];

type CircularGalleryProps = {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollEase?: number;
};

type ScrollState = {
  ease: number;
  current: number;
  target: number;
  last: number;
};

const DEFAULT_ITEMS: CircularGalleryItem[] = [
  { image: "/gallery/placeholder-1.jpg", text: "Engine Repair" },
  { image: "/gallery/placeholder-2.jpg", text: "Diagnostics" },
  { image: "/gallery/placeholder-3.jpg", text: "Fleet Service" },
  { image: "/gallery/placeholder-4.jpg", text: "Mobile Assist" },
  { image: "/gallery/placeholder-5.jpg", text: "Brake Systems" },
  { image: "/gallery/placeholder-6.jpg", text: "Aftertreatment" },
];

// ---- helpers ----
function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind<T extends object>(instance: T) {
  const proto = Object.getPrototypeOf(instance);
  if (!proto) return;
  Object.getOwnPropertyNames(proto).forEach((key) => {
    const record = instance as Record<string, unknown>;
    const value = record[key];
    if (key !== "constructor" && typeof value === "function") {
      record[key] = value.bind(instance);
    }
  });
}

// ---- Text texture ----
function createTextTexture(
  gl: GLContext,
  text: string,
  font = "bold 30px sans-serif",
  color = "black"
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("2D context not available");
  }
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);

  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;

  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

type TitleConfig = {
  gl: GLContext;
  plane: Mesh;
  text: string;
  textColor?: string;
  font?: string;
};

class Title {
  mesh: Mesh;
  private width: number;
  private height: number;

  constructor({ gl, plane, text, textColor = "#545050", font = "30px sans-serif" }: TitleConfig) {
    const { texture, width, height } = createTextTexture(gl, text, font, textColor);
    this.width = width;
    this.height = height;
    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(gl, { geometry, program });
    this.mesh.setParent(plane);
    this.updateForPlane(plane);
  }

  updateForPlane(plane: Mesh) {
    const aspect = this.width / this.height;
    const textHeight = plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
  }

  alignWithPlane(plane: Mesh) {
    this.mesh.rotation.y = -plane.rotation.y;
    this.mesh.rotation.x = -plane.rotation.x;
    this.mesh.rotation.z = -plane.rotation.z;
  }
}

type MediaConfig = {
  geometry: Plane;
  gl: GLContext;
  image: string;
  index: number;
  length: number;
  scene: Transform;
  text: string;
  textColor: string;
  borderRadius: number;
};

class Media {
  plane: Mesh;
  private program: Program;
  private title: Title;
  private index: number;
  private length: number;
  private radius: number;

  constructor({ geometry, gl, image, index, length, scene, text, textColor, borderRadius }: MediaConfig) {
    this.index = index;
    this.length = length;
    this.radius = 3;

    const texture = new Texture(gl, { generateMipmaps: true });

    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedRectSDF(vec2 p, vec2 b, float r) {
          vec2 q = abs(p) - b + vec2(r);
          return length(max(q, 0.0)) - r + min(max(q.x, q.y), 0.0);
        }
        void main() {
          vec2 centered = vUv - 0.5;
          float radius = clamp(uBorderRadius, 0.0, 0.5);
          float sdf = roundedRectSDF(centered, vec2(0.5 - radius), radius);
          if (sdf > 0.0) discard;
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uBorderRadius: { value: borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;
    img.onload = () => {
      texture.image = img;
    };

    this.plane = new Mesh(gl, { geometry, program: this.program });
    this.plane.setParent(scene);

    this.title = new Title({ gl, plane: this.plane, text, textColor });
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  update(angleOffset: number, radius: number) {
    this.radius = radius;
    const angleStep = (Math.PI * 2) / this.length;
    const angle = angleStep * this.index + angleOffset;
    this.plane.position.x = Math.sin(angle) * this.radius;
    this.plane.position.z = Math.cos(angle) * this.radius - this.radius;
    this.plane.rotation.y = -angle;
    this.title.alignWithPlane(this.plane);
  }

  onResize(viewport: { width: number; height: number }) {
    const planeHeight = viewport.height * 0.5;
    const planeWidth = planeHeight * 1.4;
    this.plane.scale.set(planeWidth, planeHeight, 1);
    this.title.updateForPlane(this.plane);
  }
}

type AppConfig = {
  items: CircularGalleryItem[];
  bend: number;
  textColor: string;
  borderRadius: number;
  scrollEase: number;
};

class App {
  private renderer: Renderer;
  private gl: GLContext;
  private camera: Camera;
  private scene: Transform;
  private medias: Media[] = [];
  private planeGeometry: Plane;
  private scroll: ScrollState = { ease: 0.05, current: 0, target: 0, last: 0 };
  private raf = 0;
  private viewport = { width: 1, height: 1 };
  private container: HTMLElement;
  private pointerDown = false;
  private pointerLastX = 0;
  private radius = 3;

  private resizeHandler: () => void;

  constructor(container: HTMLElement, { items, bend, textColor, borderRadius, scrollEase }: AppConfig) {
    this.container = container;
    this.scroll.ease = scrollEase;
    this.radius = Math.max(bend, 1.5);

    autoBind(this);

    this.renderer = new Renderer({ alpha: true, antialias: true });
    this.gl = this.renderer.gl;
    container.appendChild(this.gl.canvas);
    this.gl.canvas.style.width = "100%";
    this.gl.canvas.style.height = "100%";
    this.gl.canvas.style.display = "block";
    this.container.style.touchAction = "none";

    this.camera = new Camera(this.gl);
    this.camera.position.z = 5;
    this.scene = new Transform();

    this.planeGeometry = new Plane(this.gl, { widthSegments: 10, heightSegments: 10 });
    this.medias = items.map(
      (data, index) =>
        new Media({
          geometry: this.planeGeometry,
          gl: this.gl,
          image: data.image,
          index,
          length: items.length,
          scene: this.scene,
          text: data.text,
          textColor,
          borderRadius,
        })
    );

    this.onResize();
    this.update();

    this.resizeHandler = debounce(this.onResize, 150);
    window.addEventListener("resize", this.resizeHandler);
    container.addEventListener("wheel", this.onWheel, { passive: false });
    container.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointermove", this.onPointerMove);
  }

  onResize() {
    const bounds = this.container.getBoundingClientRect();
    const width = bounds.width;
    const height = bounds.height;
    this.renderer.setSize(width, height);
    this.camera.perspective({ aspect: width / height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const viewHeight = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const viewWidth = viewHeight * this.camera.aspect;
    this.viewport = { width: viewWidth, height: viewHeight };

    this.medias.forEach((media) => media.onResize(this.viewport));
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    this.scroll.target -= event.deltaY * 0.0015;
  }

  onPointerDown(event: PointerEvent) {
    this.pointerDown = true;
    this.pointerLastX = event.clientX;
    this.container.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent) {
    if (!this.pointerDown) return;
    const delta = event.clientX - this.pointerLastX;
    this.scroll.target -= delta * 0.01;
    this.pointerLastX = event.clientX;
  }

  onPointerUp(event: PointerEvent) {
    if (!this.pointerDown) return;
    this.pointerDown = false;
    try {
      this.container.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const twoPi = Math.PI * 2;
    if (this.scroll.current > twoPi || this.scroll.current < -twoPi) {
      this.scroll.current = ((this.scroll.current % twoPi) + twoPi) % twoPi;
      this.scroll.target = ((this.scroll.target % twoPi) + twoPi) % twoPi;
    }

    this.medias.forEach((media) => media.update(this.scroll.current, this.radius));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resizeHandler);
    this.container.removeEventListener("wheel", this.onWheel as EventListener);
    this.container.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointermove", this.onPointerMove);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  scrollEase = 0.02,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryItems = useMemo(
    () => (items && items.length > 0 ? items : DEFAULT_ITEMS),
    [items]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items: galleryItems,
      bend,
      textColor,
      borderRadius,
      scrollEase,
    });
    return () => {
      app.destroy();
    };
  }, [galleryItems, bend, textColor, borderRadius, scrollEase]);

  return <div className="circular-gallery" ref={containerRef} />;
}
