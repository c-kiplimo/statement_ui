"use client"
import React, { useEffect, useState } from 'react'
import ActivitiesTable, { ActivitiesTypes } from './(activity-table)/activity.table'
import styles from './activity.module.css'
import SearchButton from '@/src/components/widgets/search-button/search-button'
import FilterButton from '@/src/components/widgets/filter-button/filter.button'
import { SearchOutlined } from '@ant-design/icons'
import SortButton from '@/src/components/widgets/sort-button/sort.button'
// import useProfileId from '@/src/hooks/profileId'
import { getCustomerActivities } from '@/src/lib/actions/account-setup/customer.activities.actions'

type ActivityProps = {
  customerId:number
}

const ActivitiesPage = ({customerId}:ActivityProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activities, setActivities] = useState<ActivitiesTypes[]>([])
  const [loading, setLoading] = useState(true)
  // const customerId = useProfileId();

  useEffect(() => {
    const fetchActivities = async () => {
      if (customerId) {
        try {
          const response = await getCustomerActivities(customerId)
          setActivities(response)
        } catch (error) {
          console.error('Failed to fetch activities:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchActivities()
  }, [customerId])

  const handleSearchChange = (value:string) => {
    setSearchQuery(value)
  }

  const filteredActivityData = activities.filter(activity =>
    activity.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.activityDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleClick = () => {}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={`h6b`}>Activity Log</span>
        <span className={styles.headericons}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearchChange} />
          </SearchButton>
          <FilterButton onClick={handleClick} />
          <SortButton onClick={handleClick} />
        </span>
      </div>
      {loading ? (
        <p>Loading Activities...</p>
      ) : (
        <ActivitiesTable restrictions={filteredActivityData} />
      )}    
      </div>
  )
}

export default ActivitiesPage
