import { ApiOutlined, NodeIndexOutlined, SettingOutlined, GithubFilled, AppstoreOutlined } from "@ant-design/icons"
import { floatShadow } from "@rxdrag/react-antd-shell"
import { Space, Button, MenuProps, Menu } from "antd"
import { Logo, MenuButton } from "example-common"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { SvgIcon } from "@rxdrag/react-antd-shell"
import { DeviceType, ThemeMode } from "../interfaces"
import { useApp } from "../hooks/useApp"
import { useAppTranslate } from "../hooks/useAppTranslate"
import { ThemeButton } from "../components"
import { useNavigate, useParams } from "react-router-dom"

const ToolbarShell = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 16px;
  box-shadow: ${floatShadow};
  z-index: 1;
  background-color: ${props => props.theme.token?.colorBgBase};
`

const TopMenu = styled(Menu)`
  background-color: transparent;
`

const ProjectTitle = styled.span`
  margin-left: 16px;
  color: ${porps => porps.theme.token?.colorTextSecondary};
  font-size: 14px;
`

export enum TopNavType {
  ui = "ui",
  model = "model",
  extends = "extends",
  api = "api",
  workflow = "workflow",
  plugins = "plugins",
  setttings = "settings"
}

const items: MenuProps['items'] = [
  {
    label: '界面',
    key: TopNavType.ui,
    icon: <AppstoreOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: '模型',
    key: TopNavType.model,
    icon: <SvgIcon>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em"><path d="M138.715429 781.568l336.420571 191.140571c24.868571 14.153143 48 14.573714 73.728 0l336.420571-191.140571c39.862857-22.710857 61.714286-45.860571 61.714286-107.995429V334.134857c0-47.561143-18.852571-74.569143-53.997714-94.72l-302.994286-172.269714c-52.717714-30.427429-104.155429-29.988571-156.013714 0l-302.994286 172.288c-35.145143 20.132571-53.997714 47.140571-53.997714 94.72v339.419428c0 62.134857 21.851429 85.284571 61.714286 107.995429zM512 476.013714L185.417143 291.291429l279.003428-159.451429c32.585143-18.413714 61.714286-18.834286 95.158858 0l278.985142 159.451429zM179.017143 721.554286c-24.448-13.714286-32.585143-27.008-32.585143-50.139429V351.707429l329.563429 188.16v350.555428z m665.984 0l-296.996572 168.850285V539.849143l329.563429-188.141714V671.451429c0 23.131429-8.137143 36.425143-32.566857 50.139428z"></path></svg>
    </SvgIcon>,
  },
  {
    label: '服务扩展',
    key: TopNavType.extends,
    icon: <SvgIcon>
      <svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M417.322667 629.333333l85.333333 85.333334H672v213.333333h-213.333333v-166.826667l-67.861334-67.861333L128 693.333333v-64h289.322667z m190.677333 149.333334h-85.333333v85.333333h85.333333v-85.333333z m341.333333-362.666667v213.333333h-213.333333V554.666667H128v-64h608v-74.666667h213.333333z m-64 64h-85.333333v85.333333h85.333333v-85.333333z m-213.333333-362.666667v213.333334h-172.8l-81.877333 81.92H128v-64l262.805333-0.021334 67.861334-67.861333V117.333333h213.333333z m-64 64h-85.333333v85.333334h85.333333v-85.333334z" key="7154"></path></svg>
    </SvgIcon>,
  },
  {
    label: '接口',
    key: TopNavType.api,
    icon: <ApiOutlined />,
  },
  {
    label: '工作流',
    key: TopNavType.workflow,
    icon: <NodeIndexOutlined />,
  },
  {
    label: '插件',
    key: TopNavType.plugins,
    icon: <SvgIcon>
      <svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M915.2 1015.04H108.8a97.28 97.28 0 0 1-97.28-96.64V111.36A97.28 97.28 0 0 1 108.8 14.72h806.4a97.28 97.28 0 0 1 97.28 96.64v807.04a97.28 97.28 0 0 1-97.28 96.64zM108.8 80.64a30.72 30.72 0 0 0-30.72 30.72v807.04a30.72 30.72 0 0 0 30.72 30.72h806.4a30.72 30.72 0 0 0 30.72-30.72V111.36a30.72 30.72 0 0 0-30.72-30.72z" ></path><path d="M323.84 817.28a32.64 32.64 0 0 1-32.64-33.28V245.76a33.28 33.28 0 1 1 64 0v538.24a33.28 33.28 0 0 1-31.36 33.28z" ></path><path d="M323.84 638.08m-96.64 0a96.64 96.64 0 1 0 193.28 0 96.64 96.64 0 1 0-193.28 0Z" ></path><path d="M700.16 817.28a33.28 33.28 0 0 1-33.28-33.28V245.76a33.28 33.28 0 1 1 64 0v538.24a32.64 32.64 0 0 1-30.72 33.28z" ></path><path d="M700.16 391.68m-96.64 0a96.64 96.64 0 1 0 193.28 0 96.64 96.64 0 1 0-193.28 0Z" ></path></svg>
    </SvgIcon>,
  },
  {
    label: '设置',
    key: TopNavType.setttings,
    icon: <SettingOutlined />,
  },
];

export const Toolbar = memo((
  props: {
    themeMode?: ThemeMode,
    onThemeModeChange?: (themeMode: ThemeMode) => void,
  }
) => {
  const { themeMode, onThemeModeChange } = props;
  const [current, setCurrent] = useState<string>(TopNavType.ui);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const app = useApp()
  const t = useAppTranslate()
  const { device } = useParams();
  const navigate = useNavigate()
  const handleDeviceChange = useCallback((value: string) => {
    navigate("ui-designer/" + value)
  }, [navigate])
  return (
    <ToolbarShell className="zoomable-toobar">
      <Space>
        <Logo mini />
        <TopMenu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        {/* <Space>
          <Button
            type="text"
            icon={
              <SvgIcon>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em"><path d="M138.715429 781.568l336.420571 191.140571c24.868571 14.153143 48 14.573714 73.728 0l336.420571-191.140571c39.862857-22.710857 61.714286-45.860571 61.714286-107.995429V334.134857c0-47.561143-18.852571-74.569143-53.997714-94.72l-302.994286-172.269714c-52.717714-30.427429-104.155429-29.988571-156.013714 0l-302.994286 172.288c-35.145143 20.132571-53.997714 47.140571-53.997714 94.72v339.419428c0 62.134857 21.851429 85.284571 61.714286 107.995429zM512 476.013714L185.417143 291.291429l279.003428-159.451429c32.585143-18.413714 61.714286-18.834286 95.158858 0l278.985142 159.451429zM179.017143 721.554286c-24.448-13.714286-32.585143-27.008-32.585143-50.139429V351.707429l329.563429 188.16v350.555428z m665.984 0l-296.996572 168.850285V539.849143l329.563429-188.141714V671.451429c0 23.131429-8.137143 36.425143-32.566857 50.139428z"></path></svg>
              </SvgIcon>
            }
          >模型</Button>
          <Button type="text" icon={<SvgIcon>
            <svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M417.322667 629.333333l85.333333 85.333334H672v213.333333h-213.333333v-166.826667l-67.861334-67.861333L128 693.333333v-64h289.322667z m190.677333 149.333334h-85.333333v85.333333h85.333333v-85.333333z m341.333333-362.666667v213.333333h-213.333333V554.666667H128v-64h608v-74.666667h213.333333z m-64 64h-85.333333v85.333333h85.333333v-85.333333z m-213.333333-362.666667v213.333334h-172.8l-81.877333 81.92H128v-64l262.805333-0.021334 67.861334-67.861333V117.333333h213.333333z m-64 64h-85.333333v85.333334h85.333333v-85.333334z" key="7154"></path></svg>
          </SvgIcon>}>服务扩展</Button>
          <Button type="text" icon={<ApiOutlined />}>接口</Button>
          <Button type="text" icon={<NodeIndexOutlined />}>工作流</Button>
          <Button type="text"
            icon={
              <SvgIcon>
                <svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M915.2 1015.04H108.8a97.28 97.28 0 0 1-97.28-96.64V111.36A97.28 97.28 0 0 1 108.8 14.72h806.4a97.28 97.28 0 0 1 97.28 96.64v807.04a97.28 97.28 0 0 1-97.28 96.64zM108.8 80.64a30.72 30.72 0 0 0-30.72 30.72v807.04a30.72 30.72 0 0 0 30.72 30.72h806.4a30.72 30.72 0 0 0 30.72-30.72V111.36a30.72 30.72 0 0 0-30.72-30.72z" ></path><path d="M323.84 817.28a32.64 32.64 0 0 1-32.64-33.28V245.76a33.28 33.28 0 1 1 64 0v538.24a33.28 33.28 0 0 1-31.36 33.28z" ></path><path d="M323.84 638.08m-96.64 0a96.64 96.64 0 1 0 193.28 0 96.64 96.64 0 1 0-193.28 0Z" ></path><path d="M700.16 817.28a33.28 33.28 0 0 1-33.28-33.28V245.76a33.28 33.28 0 1 1 64 0v538.24a32.64 32.64 0 0 1-30.72 33.28z" ></path><path d="M700.16 391.68m-96.64 0a96.64 96.64 0 1 0 193.28 0 96.64 96.64 0 1 0-193.28 0Z" ></path></svg>
              </SvgIcon>
            }
          >插件</Button>
          <Button type="text" icon={<SettingOutlined />}>设置</Button>
          <Select
            value={device}
            style={{ minWidth: 100 }}
            options={[
              { value: DeviceType.admin, label: t(DeviceType.admin) },
              { value: DeviceType.h5, label: t(DeviceType.h5) },
              { value: DeviceType.website, label: t(DeviceType.website) },
              { value: DeviceType.largeScreen, label: t(DeviceType.largeScreen) },
            ]}
            onChange={handleDeviceChange}
          />
        </Space> */}
        <ProjectTitle>{app?.title}</ProjectTitle>
      </Space>
      <Space>
        <ThemeButton flat themeMode={themeMode} onThemeModeChange={onThemeModeChange} />
        <Button
          type="text"
          href="https://github.com/rxdrag/rxeditor"
          target="_blank"
          icon={<GithubFilled />}
        />
        <Button type="primary">保存</Button>
        <Button>预览</Button>
        <Button >发布</Button>
        <MenuButton />
      </Space>
    </ToolbarShell>
  )
})