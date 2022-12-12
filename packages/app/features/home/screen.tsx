import {
  Button,
  ButtonProps,
  H2,
  H3,
  H4,
  Paragraph,
  Separator,
  YStackProps,
  ScrollView,
  Sheet,
  XStack,
  YStack,
} from '@my/ui'
import { whiteA } from '@tamagui/colors'
import { ChevronDown, ChevronUp, ArrowRight, ChevronRight } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <ScrollView flex={1} backgroundColor={'whitesmoke'}>
      <HomeScreenHeadline p="$4" mb="$6" />
      <HomeWhatIsSacola p="$4" />
      <HomeScreenFAQ />
    </ScrollView>
  )
}
const HomeScreenHeadline = (props: YStackProps) => (
  <YStack space="$4" maxWidth={600} {...props}>
    <H2 textTransform="uppercase" textAlign="left" color={'black'}>
      Save and Organize Your Favorite Content with Sacola
    </H2>
    <Button
      color="white"
      alignSelf="baseline"
      backgroundColor={'black'}
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

    <XStack mt="$4" p="$4" alignItems="center" w="100%">
      <Paragraph>
        Sacola is a website and app that allows users to save articles, videos, and other content
        for later viewing. It is often used as a bookmarking tool for users to save interesting or
        useful content that they want to read or watch at a later time. Sacola can be used on a
        variety of devices, including computers, smartphones, and tablets, and it offers a range of
        features such as tagging, offline access, and recommendation algorithms to help users
        discover new content
      </Paragraph>
    </XStack>
  </YStack>
)
const HomeScreenFAQ = (props: YStackProps) => (
  <YStack bg={'black'}>
    <YStack
      p="$4"
      alignItems="baseline"
      borderTopWidth={'$4'}
      borderTopLeftRadius="$12"
      space="$1"
      bg={'whitesmoke'}
      borderTopColor={'whitesmoke'}
      borderTopRightRadius="$12"
    >
      <YStack mb="$4">
        <H4 textAlign="left" w="100%" color={'black'}>
          FAQ
        </H4>
        <H2 color={'black'}>Getting Started with Sacola</H2>
      </YStack>

      <Accordion title="How does Sacola work?">
        Sacola is a website and app that allows users to save articles, videos, and other content
        for later viewing. It is easy to use and offers a range of features such as tagging, offline
        access, and recommendation algorithms to help users discover new content.
      </Accordion>
      <Separator als="stretch" borderColor="black" />

      <Accordion title="What kind of content can I save with Sacola?">
        You can save a wide variety of content with Sacola, including articles, videos, images, and
        more. Simply add the content you want to save to your Sacola account and access it anytime,
        anywhere.
      </Accordion>
      <Separator als="stretch" borderColor="black" />

      <Accordion title="Can I access my saved content offline with Sacola?">
        Yes, you can access your saved content offline with Sacola. This is a great feature for when
        you are traveling or don't have an internet connection. Simply save the content you want to
        access offline to your Sacola account and access it anytime, even without an internet
        connection.
      </Accordion>
      <Separator als="stretch" borderColor="black" />

      <Accordion title="How do the recommendation algorithms work in Sacola?">
        The recommendation algorithms in Sacola are designed to help users discover new and
        interesting content. They take into account the content you have saved, as well as your
        interests and preferences, to provide personalized recommendations. This is a great way to
        discover new content and expand your horizons.
      </Accordion>
      <Separator als="stretch" borderColor="black" />

      <Accordion title="Is Sacola free to use?">
        Yes, Sacola is free to use. You can create a Sacola account and start saving and organizing
        your favorite content without any cost.
      </Accordion>
      <Separator als="stretch" borderColor="black" />

      <Accordion title="What are the benefits of the premium subscription service for Sacola?">
        The premium subscription service for Sacola offers a range of additional features and
        benefits, such as expanded offline access, enhanced recommendation algorithms, and
        customizable features. It is a great way to take your Sacola experience to the next level.
      </Accordion>
      <Separator als="stretch" borderColor="black" />

      <Accordion title="Can I use Sacola on multiple devices?">
        Yes, you can use Sacola on multiple devices. Simply log in to your Sacola account on all of
        your devices and access your saved content anytime, anywhere.
      </Accordion>
      <Separator als="stretch" borderColor="black" />

      <Accordion title="How do I save content with Sacola?">
        To save content with Sacola, simply log in to your account and click the "Save" button on
        the content you want to save. You can also use the Sacola bookmarklet or browser extension
        to quickly save content from your web browser.
      </Accordion>
      <Separator als="stretch" borderColor="black" />

      <Accordion title="Is Sacola safe and secure?">
        Yes, Sacola is safe and secure. We use industry-standard encryption to protect your personal
        information and your saved content.
      </Accordion>
      <Accordion title="Can I customize my Sacola experience?">
        Yes, you can customize your Sacola experience. You can create custom tags to organize your
        content, use the recommendation algorithms to discover new content, and take advantage of
        the customizable features in the premium subscription service.
      </Accordion>
    </YStack>
  </YStack>
)
// Write a Accordion Component
const Accordion = ({ children, title, ...props }: { title: string } & ButtonProps) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((x) => !x)
  return (
    <>
      <XStack space="$1" jc={'space-between'} width="100%" alignItems="center" onPress={toggle}>
        <Paragraph textDecorationLine={open ? 'underline' : 'none'} flexShrink={1} color={'black'}>
          {title}
        </Paragraph>
        {open ? <ChevronDown /> : <ChevronRight />}
      </XStack>

      {open && (
        <XStack mt={'$2'} mb="$4" onPress={toggle} {...props}>
          <Paragraph flex={1} color={'black'}>
            {children}
          </Paragraph>
        </XStack>
      )}
    </>
  )
}

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
