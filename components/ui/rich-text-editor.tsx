// components/ui/rich-text-editor.tsx

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Write here...",
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false, // FIX: Disable SSR rendering
    extensions: [
      StarterKit.configure({
        heading: false, // Disable headings
        blockquote: false, // Disable blockquotes
        code: false, // Disable code
        codeBlock: false, // Disable code blocks
        horizontalRule: false, // Disable horizontal rules
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-[120px] max-w-none p-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when prop changes (for form reset/default values)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className={cn("border rounded-lg", className)}>
        <div className="border-b bg-slate-50 p-2 h-[42px]" />
        <div className="p-3 min-h-[120px] text-slate-400">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={cn("border rounded-lg", className)}>
      {/* Toolbar */}
      <div className="border-b bg-slate-50 p-2 flex gap-1 flex-wrap">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          tooltip="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          tooltip="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px bg-slate-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          tooltip="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          tooltip="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}

// Toolbar Button Component
interface ToolbarButtonProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  tooltip: string;
}

function ToolbarButton({ onClick, active, children, tooltip }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-2 rounded hover:bg-slate-200 transition",
        active && "bg-slate-300"
      )}
      title={tooltip}
    >
      {children}
    </button>
  );
}