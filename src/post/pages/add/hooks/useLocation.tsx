import Icon from '@/components/Icon'
import { postEvents } from '@/utils/events'
import { LocationListItem } from '@/services/location/types'
import { colorBlackNormal } from '@/styles/variables'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

export const useLocation = () => {
  const [location, setLocation] = useState('')
  const handleChooseLocation = () => {
    Taro.navigateTo({
      url: `/post/pages/choose-location/index?location=${location}`
    })
  }
  useEffect(() => {
    Taro.eventCenter.on(
      postEvents.setLocation,
      (newLocation: LocationListItem) => {
        setLocation(newLocation.name)
      }
    )
    return () => {
      Taro.eventCenter.off(postEvents.setLocation)
    }
  }, [])
  const locationElement = location && (
    <div
      className="flex items-center text-black-normal"
      onClick={handleChooseLocation}
    >
      <Icon
        className="mr-4"
        name="location-fill"
        size={18}
        color={colorBlackNormal}
      />
      {location}
    </div>
  )
  return { location, locationElement, handleChooseLocation }
}
