import { mergeProps } from '../defaultConfig/mergeProps'

test('get proper props for component', () => {
  const props = {
    description: 'test description props',
    descriptionColor: 'rgb(0, 0, 50)',
    borderRadius: 5,
    borderType: 'no-border',
  }

  const globalConfig = {
    description: 'test description global',
    descriptionSize: 5,
    descriptionColor: 'rgb(0, 100, 0)',
    borderRadius: 5,
  }

  const notificationTypeConfig = {
    description: 'test description',
    titleSize: 23,
    titleColor: '#fff',
    descriptionSize: 10,
    descriptionColor: 'rgb(0, 0, 0)',
    borderRadius: 5,
  }

  expect(mergeProps(props, 'error', true, globalConfig, notificationTypeConfig)).toMatchSnapshot()
})
