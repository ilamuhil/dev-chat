import ChatIcon from '@/public/icons/chat.svg'
import SettingsIcon from '@/public/icons/settings.svg'
import ContactsIcon from '@/public/icons/contacts.svg'
import Image from 'next/image'
import { randId } from '@/lib/utils'
import Link from 'next/link'
type SidebarNavProps = {}

const SidebarNav = (props: SidebarNavProps) => {
  const listItems = [
    { icon: ChatIcon, title: 'Chats', url: '/chatboard/chats' },
    { icon: ContactsIcon, title: 'Contacts', url: '/chatboard/contacts' },
    { icon: SettingsIcon, title: 'Settings', url: '/chatboard/settings' },
  ]
  return (
    <aside className='fixed'>
      <section>
        {listItems.map((item, index) => (
          <ListItem key={index} {...item} />
        ))}
      </section>
    </aside>
  )
}

type ListItemProps = {
  icon: any
  title: string
  url: string
}

const ListItem = (props: ListItemProps) => {
  return (
    <Link className='js gap-4 items-center' href={props.url}>
      <Image src={props.icon} alt={props.title} width={24} height={24}></Image>
      <h3 className='text-lg font-semibold'>{props.title}</h3>
    </Link>
  )
}

export default SidebarNav
