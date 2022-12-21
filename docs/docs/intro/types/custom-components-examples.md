---
sidebar_position: 1
---

# 🪬 Specifying default types

<br/>

Instead of using `useNotification` returned by `createNotifications()` you can default specify types by adding global type declarations.
This will overwrite types of `useNotification`, `notify`, `modify`, `remove` imported from `react-native-notificated`

To achieve that you need to create a `d.ts` file e.g. `notificated.d.ts` with content like this:

```tsx
declare global {
  namespace Notificated {
    interface CustomVariants {}
  }
}
```

## You have two ways to provide your types.

First one assumes that you will prepare them manually like this.

```tsx
import { Variant } from 'react-native-notificated'

type Variants = {
  variantName: Variant<typeof YourComponent>
}

declare global {
  namespace Notificated {
    interface CustomVariants extends Variants {}
  }
}
```

Second one assumes that you will use utility type provided by library.
This approach assumes that configuration is your source of type. If you change your configuration the types will not require update.

```tsx
import { createNotifications } from 'react-native-notificated'

const { CustomVariantsTypeHelper } = createNotifications({
  variants: {
    variantName: { component: YourComponent },
  },
})

type Variants = typeof CustomVariantsTypeHelper

declare global {
  namespace Notificated {
    interface CustomVariants extends Variants {}
  }
}
```
