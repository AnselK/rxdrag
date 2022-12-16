import { ITreeNode } from "core";
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

//tree的节点变化，会触发刷新
export function useCurrentTree() {
  const [rootNode, setRootNode] = useState<ITreeNode | null>(null)
  const designer = useDesignerEngine()

  const getRootNode = useCallback(() => {
    const treeNode = designer?.getMonitor().getCurrentTree() || null
    setRootNode(treeNode)
  }, [designer])

  useEffect(() => {
    getRootNode()
  }, [getRootNode])

  const handleTreeChange = useCallback(() => {
    getRootNode()
  }, [getRootNode])

  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToActiveDocumentChanged(handleTreeChange)
    const unscibeNode = designer?.getMonitor().subscribeToNodeChanged(handleTreeChange)
    return () => {
      unscribe?.()
      unscibeNode?.()
    }
  }, [designer, handleTreeChange])

  return rootNode
}