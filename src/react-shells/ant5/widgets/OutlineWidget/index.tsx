import { DownOutlined } from "@ant-design/icons";
import { Tree, TreeProps } from "antd";
import { DataNode } from "antd/es/tree";
import { ID } from "core";
import { useActions } from "core-react/hooks/useActions";
import { useActiveIdState } from "core-react/hooks/useActiveIdState";
import { useCurrentTree } from "core-react/hooks/useCurrentTree";
import { useGetNode } from "core-react/hooks/useGetNode";
import { useSelectedNodeIds } from "core-react/hooks/useSelectedNodeIds";
import { Key, memo, useCallback, useMemo } from "react"
import { PaneContainer } from "react-shells/ant5/layouts/ToggleAblePane/PaneContainer"
import { PanelContent } from "react-shells/ant5/layouts/ToggleAblePane/PanelContent"
import { PaneTitle } from "react-shells/ant5/layouts/ToggleAblePane/PaneTitle"

export const OutlineWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props
  const [activedId, setActivedId] = useActiveIdState()
  const getNode = useGetNode()
  const actions = useActions()
  const currentTree = useCurrentTree()
  const selectedNodeIds = useSelectedNodeIds(currentTree?.documentId)
  const transNode = useCallback((id: ID): DataNode | undefined => {
    const node = getNode(id)
    if (node) {
      return {
        title: node.title,
        key: node.id,
        children: node.children?.map(childId => transNode(childId)).filter(nd => nd !== undefined) as any
      }
    }

    return undefined
  }, [getNode])

  const treeItems: DataNode[] = useMemo(() => {
    if (!currentTree) {
      return []
    }
    const root = transNode(currentTree.id)
    if (!root) {
      return []
    }
    return [
      root
    ]
  }, [currentTree, transNode])

  const onSelect: TreeProps['onSelect'] = useCallback((selectedKeys: Key[]) => {
    if (currentTree) {
      actions?.selectNodes(selectedKeys as any, currentTree?.documentId)
    }
  }, [actions, currentTree]);

  const handleMouseEnter = useCallback((info: any) => {
    setActivedId(info?.node?.key)
  }, [setActivedId])

  const handleMouseLeave = useCallback(() => {
    setActivedId(null)
  }, [setActivedId])

  return (
    <PaneContainer style={{ display: display ? undefined : "none" }}>
      <PaneTitle title="outline" />
      <PanelContent style={{ paddingTop: 8 }}>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={[currentTree?.id || ""]}
          activeKey={activedId || ""}
          selectedKeys={selectedNodeIds || undefined}
          onSelect={onSelect}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          treeData={treeItems}
        />
      </PanelContent>
    </PaneContainer>
  )
})