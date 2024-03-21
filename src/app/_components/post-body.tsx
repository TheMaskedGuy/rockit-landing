"use client";
import { useEffect, useRef } from "react";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  const useHighlightAndScroll = (text: string) => {
    useEffect(() => {
      if (!text) return;

      const range = document.createRange();
      const selection = window.getSelection();
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );
      const urlParams = new URLSearchParams(document.location.search);
      const toOnboard = urlParams.get("onboard");
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue?.includes(text) && toOnboard) {
          range.selectNodeContents(node);
          selection?.removeAllRanges();
          selection?.addRange(range);
          //@ts-ignore
          node.parentNode?.scrollIntoView();
          break;
        }
      }
    }, [text]);
  };

  useHighlightAndScroll("Instructions For Use");

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
