import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

/**
 * Fila horizontal com scroll nativo + scroll-snap, arraste com o mouse e
 * navegação por setas (um card por vez). Os cards precisam ter `data-card`.
 *
 * - Trackpad/touch: comportamento nativo do navegador (snap incluso).
 * - Mouse: arrastar move a fila; o snap é suspenso durante o arraste e, ao
 *   soltar, a fila assenta suavemente no card mais próximo. Um arraste real
 *   (> 5px) cancela o clique que viria em seguida (não abre card sem querer).
 * - `go(1 | -1)`: avança/volta um card com rolagem suave.
 * - `edges`: se a fila está no início/fim (para desabilitar as setas).
 */
export function useDragScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean; id: number } | null>(null);
  const suppressClick = useRef(false);

  const updateEdges = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const start = el.scrollLeft <= 4;
    const end = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const step = () => {
    const cards = ref.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards || cards.length < 2) return 0;
    return (cards[1]?.offsetLeft ?? 0) - (cards[0]?.offsetLeft ?? 0);
  };

  const go = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  const settleToNearest = (el: T) => {
    const s = step();
    const target = s ? Math.round(el.scrollLeft / s) * s : el.scrollLeft;
    el.scrollTo({ left: target, behavior: "smooth" });
    // Reativa o snap depois que a rolagem suave assentar.
    window.setTimeout(() => (el.style.scrollSnapType = ""), 450);
  };

  const bind = {
    ref,
    onScroll: updateEdges,
    onPointerDown: (e: PointerEvent<T>) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag.current = {
        x: e.clientX,
        left: e.currentTarget.scrollLeft,
        moved: false,
        id: e.pointerId,
      };
    },
    onPointerMove: (e: PointerEvent<T>) => {
      const d = drag.current;
      if (!d || e.pointerId !== d.id) return;
      const el = e.currentTarget;
      const dx = e.clientX - d.x;
      if (!d.moved && Math.abs(dx) > 5) {
        d.moved = true;
        el.style.scrollSnapType = "none";
        el.setPointerCapture(e.pointerId);
      }
      if (d.moved) el.scrollLeft = d.left - dx;
    },
    onPointerUp: (e: PointerEvent<T>) => endDrag(e),
    onPointerCancel: (e: PointerEvent<T>) => endDrag(e),
    onClickCapture: (e: { preventDefault: () => void; stopPropagation: () => void }) => {
      if (suppressClick.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  };

  function endDrag(e: PointerEvent<T>) {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    if (d.moved) {
      suppressClick.current = true;
      window.setTimeout(() => (suppressClick.current = false), 0);
      settleToNearest(e.currentTarget);
    }
  }

  return { bind, edges, go };
}
