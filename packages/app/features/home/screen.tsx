import {
  Anchor,
  Button,
  ButtonProps,
  H1,
  H2,
  H3,
  H4,
  MyComponent,
  Paragraph,
  Separator,
  YStackProps,
  ScrollView,
  Sheet,
  XStack,
  YStack,
} from '@my/ui'
import { whiteA } from '@tamagui/colors'
import { ChevronDown, ChevronUp, ArrowRight } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <ScrollView flex={1} backgroundColor={'white'}>
      <HomeScreenHeadline p="$4" mb="$6" />
      <HomeWhatIsSacola p="$4" />
      <YStack
        p="$4"
        alignItems="baseline"
        borderTopColor={'blue'}
        borderTopWidth={'$4'}
        borderTopLeftRadius="$6"
      >
        <H3 textAlign="left" color={'white'} w="100%">
          Experience the Power of Sacola: The Ultimate Content-Saving Tool
        </H3>

        <XStack bg="$orange3Light" mt="$4" p="$4" alignItems="center" w="100%">
          <Paragraph>
            Sacola is a popular website and app that allows users to save articles, videos, and
            other content for later viewing. It is often used as a bookmarking tool for users to
            save interesting or useful content that they want to read or watch at a later time.
            Sacola can be used on a variety of devices, including computers, smartphones, and
            tablets, and it offers a range of features such as tagging, offline access, and
            recommendation algorithms to help users discover new content
          </Paragraph>
        </XStack>
      </YStack>

      <SheetDemo />
    </ScrollView>
  )
}
const HomeScreenHeadline = (props: YStackProps) => (
  <YStack space="$4" maxWidth={600} {...props}>
    <H2 textTransform="uppercase" textAlign="left">
      Save and Organize Your Favorite Content with Sacola
    </H2>
    <Button
      color="black"
      alignSelf="baseline"
      backgroundColor={'$orange3Light'}
      borderRadius={'$10'}
      iconAfter={ArrowRight}
    >
      Sign Up
    </Button>
  </YStack>
)
const HomeWhatIsSacola = (props: YStackProps) => (
  <YStack bg="black" p="$4" alignItems="baseline" {...props}>
    <H3 textAlign="left" color={'white'} w="100%">
      Experience the Power of Sacola: The Ultimate Content-Saving Tool
    </H3>

    <XStack bg="$orange3Light" mt="$4" p="$4" alignItems="center" w="100%">
      <Paragraph>
        Sacola is a popular website and app that allows users to save articles, videos, and other
        content for later viewing. It is often used as a bookmarking tool for users to save
        interesting or useful content that they want to read or watch at a later time. Sacola can be
        used on a variety of devices, including computers, smartphones, and tablets, and it offers a
        range of features such as tagging, offline access, and recommendation algorithms to help
        users discover new content
      </Paragraph>
    </XStack>
  </YStack>
)

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame alignItems="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
