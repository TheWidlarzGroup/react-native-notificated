import { mergeProps } from '../defaultConfig/mergeProps'
import type { NotificationProps, NotificationStyleConfig } from '../defaultConfig/types'

describe('props merger tests', function () {
  it('should merge props with props as main source', () => {
    const props: NotificationProps = {
      title: 'test title props',
      description: 'test description props',
      style: {
        titleSize: 15,
        titleColor: '#fff',
        descriptionColor: 'rgb(47, 231, 50)',
        descriptionSize: 10,
        borderWidth: 5,
        borderType: 'no-border',
        borderRadius: 5,
        accentColor: '#FC6060',
      },
    }

    expect(mergeProps(props, 'error', false)).toStrictEqual({
      title: 'test title props',
      description: 'test description props',
      theme: 'regular',
      titleSize: 15,
      titleColor: '#fff',
      descriptionColor: 'rgb(47, 231, 50)',
      descriptionSize: 10,
      bgColor: undefined,
      borderWidth: 5,
      multiline: undefined,
      defaultIconType: undefined,
      borderType: 'no-border',
      borderRadius: 5,
      accentColor: '#FC6060',
      leftIconSource: expect.any(Object),
      onPress: undefined,
    })
  })

  it('should merge props with variant config as main source', () => {
    const props: NotificationProps = {
      title: '',
      description: 'test description props',
    }

    const globalConfig: NotificationStyleConfig = {
      descriptionColor: 'rgb(127, 31, 130)',
      descriptionSize: 10,
      borderWidth: 5,
      borderType: 'accent',
      borderRadius: 5,
      accentColor: '#FC2160',
    }

    expect(mergeProps(props, 'error', false, globalConfig)).toStrictEqual({
      title: '',
      description: 'test description props',
      theme: 'regular',
      titleSize: undefined,
      titleColor: undefined,
      descriptionColor: 'rgb(127, 31, 130)',
      descriptionSize: 10,
      bgColor: undefined,
      borderWidth: 5,
      multiline: undefined,
      defaultIconType: undefined,
      borderType: 'accent',
      borderRadius: 5,
      accentColor: '#FC2160',
      leftIconSource: expect.any(Object),
      onPress: undefined,
    })
  })

  it('should merge props with global config as main source', () => {
    const props: NotificationProps = {
      title: '',
      description: 'test description props',
    }

    const globalConfig: NotificationStyleConfig = {}

    const notificationTypeConfig: NotificationStyleConfig = {
      titleSize: 12,
      titleColor: '#FC6060',
      descriptionColor: 'rgb(0, 0, 50)',
      descriptionSize: 10,
      borderRadius: 10,
      accentColor: '#fff',
    }

    expect(mergeProps(props, 'error', true, globalConfig, notificationTypeConfig)).toStrictEqual({
      title: '',
      description: 'test description props',
      theme: 'dark',
      titleSize: 12,
      titleColor: '#FC6060',
      descriptionColor: 'rgb(0, 0, 50)',
      descriptionSize: 10,
      bgColor: undefined,
      borderWidth: 1,
      multiline: undefined,
      defaultIconType: undefined,
      borderType: 'border',
      borderRadius: 10,
      accentColor: '#fff',
      leftIconSource: expect.any(Object),
      onPress: undefined,
    })
  })

  it('should merge props with mixed sources', () => {
    const props: NotificationProps = {
      title: 'test title props',
      style: {
        descriptionColor: 'rgb(0, 0, 50)',
        borderRadius: 5,
        borderType: 'no-border',
      },
    }

    const globalConfig: NotificationStyleConfig = {
      descriptionSize: 5,
      descriptionColor: 'rgb(0, 100, 0)',
      borderRadius: 5,
    }

    const notificationTypeConfig: NotificationStyleConfig = {
      titleSize: 23,
      titleColor: '#fff',
      descriptionSize: 10,
      descriptionColor: 'rgb(0, 0, 0)',
      borderRadius: 5,
    }

    expect(mergeProps(props, 'error', true, globalConfig, notificationTypeConfig)).toStrictEqual({
      title: '',
      description: 'test description props',
      theme: 'dark',
      titleSize: 23,
      titleColor: '#fff',
      descriptionColor: 'rgb(0, 0, 50)',
      descriptionSize: 10,
      bgColor: undefined,
      borderWidth: 1,
      multiline: undefined,
      defaultIconType: undefined,
      borderType: 'no-border',
      borderRadius: 5,
      accentColor: '#FC6060',
      leftIconSource: expect.any(Object),
      onPress: undefined,
    })
  })
})
