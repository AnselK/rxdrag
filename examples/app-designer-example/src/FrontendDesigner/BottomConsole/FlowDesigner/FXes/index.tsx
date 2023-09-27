import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { FunctionOutlined } from "@ant-design/icons";
import { RootLabel } from "./RootLabel";
import { useAppFrontend } from "../../../../hooks/useAppFrontend";
import { useQueryFxFlows } from "../../../../hooks/useQueryFxFlows";
import { FxScope } from "../../../../interfaces/fx";
import { useModule } from "../../../hooks/useModule";
import { FxLabel } from "./FxLabel";
import { ID } from "@rxdrag/shared";

const { DirectoryTree } = Tree;

export const FXes = memo((
  props: {
    onSelect: (id: ID) => void,
  }
) => {
  const { onSelect } = props;
  const frontend = useAppFrontend()
  const module = useModule()

  const { fxFlows: moduleFxes } = useQueryFxFlows(FxScope.module, module?.id)
  const { fxFlows: deviceFxes } = useQueryFxFlows(FxScope.device, frontend?.app?.id)
  const { fxFlows: appFxes } = useQueryFxFlows(FxScope.app, frontend?.app?.id)

  const treeData: DataNode[] = useMemo(() => [
    {
      title: <RootLabel
        title="模块"
        scope={FxScope.module}
        ownerId={module?.id}
      />,
      key: 'module',
      children: moduleFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
    {
      title: <RootLabel
        title="设备端"
        scope={FxScope.device}
        ownerId={frontend?.app?.id}
      />,
      key: 'device',
      children: deviceFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
    {
      title: <RootLabel
        title="应用"
        scope={FxScope.app}
        ownerId={frontend?.app?.id}
      />,
      key: 'app',
      children: appFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
  ], [appFxes, deviceFxes, frontend?.app?.id, module?.id, moduleFxes]);

  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: React.Key[]) => {
    onSelect?.((keys?.[0] as ID | undefined) || "")
  }, [onSelect]);

  return (
    <TreeContainer>
      <DirectoryTree
        onSelect={handleSelect}
        treeData={treeData}
      />
    </TreeContainer>
  )
})