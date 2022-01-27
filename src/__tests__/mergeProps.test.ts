import { mergeProps } from '../defaultConfig/mergeProps'
import type { NotificationProps } from '../types'
import type { NotificationStyleConfig } from '../defaultConfig/types'

describe('props merger tests', function () {
  it.todo('should merge props with props as main source')
  it.todo('should merge props with variant config as main source')
  it.todo('should merge props with global config as main source')

  it('should merge props with mixed sources', () => {
    const props: NotificationProps = {
      description: 'test description props',
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
