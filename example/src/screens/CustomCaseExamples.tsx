import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notificated'
import { styles } from './styles'
import { Advertisement } from '../components/customVariants/Advertisement'
import { CustomInfo } from '../components/customVariants/CustomInfo'
import { CustomCaseButton } from '../components/customVariants/CustomCaseButton'

const { useNotifications, NotificationsProvider } = createNotifications({
  variants: {
    advertisement: {
      component: Advertisement,
      config: {
        notificationPosition: 'top',
        duration: 5000,
      },
    },
    custom_info: {
      component: CustomInfo,
      config: {
        duration: 2000,
      },
    },
  },
  isNotch: true,
})

export const CustomCaseExamples = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />

      <CustomCaseButton
        buttonTitle="Advertisement"
        onPress={() =>
          notify('advertisement', {
            params: {
              customTitle: 'The best Doughnuts in Krakow',
              customDescription:
                'Doughnuts are usually deep fried from a flour dough, but other types of batters can also be used. Various toppings and flavorings are used for different types, such as sugar, chocolate or maple glazing. Doughnuts may also include water, leavening, eggs, milk, sugar, oil, shortening, and natural or artificial flavors.',
            },
            config: {
              duration: 2000,
              notificationPosition: 'center',
            },
          })
        }
      />

      <CustomCaseButton
        buttonTitle="Custom Info"
        onPress={() =>
          notify('custom_info', {
            params: {
              customTitle: 'In progress',
            },
            config: {
              duration: 3000,
            },
          })
        }
      />
    </SafeAreaView>
  )
}
