"use client"
import React, { useEffect, useState } from 'react'
import ActivitiesTable, { ActivitiesTypes } from './(activity-table)/activity.table'
import styles from './activity.module.css'
import SearchButton from '@/src/components/widgets/search-button/search-button'
import FilterButton from '@/src/components/widgets/filter-button/filter.button'
import { SearchOutlined } from '@ant-design/icons'
import SortButton from '@/src/components/widgets/sort-button/sort.button'
import { getCustomerActivities, getCustomerStatus } from '@/src/lib/actions/account-setup/customer.activities.actions'
import { Checkbox, Popover } from 'antd'

type ActivityProps = {
  customerId:number
}

export type CustomerStatus ={
  label:string;
  value:string;
}

const ActivitiesPage = ({customerId}:ActivityProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activities, setActivities] = useState<ActivitiesTypes[]>([])
  const [status, setStatus] = useState<CustomerStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])


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

    const fetchStatus = async()=>{
      try {
        const tagdata = await getCustomerStatus(customerId);
        setStatus(tagdata);
      } catch (error) {
        console.log('Error fetching tag data', error);
        
      }
    }

    fetchActivities();
    fetchStatus();
  }, [customerId])

  const handleSearchChange = (value:string) => {
    setSearchQuery(value)
  }
  const handleStatusChange = (checkedValues: any) => {
    setSelectedStatuses(checkedValues)
  }

  const filteredActivityData = activities.filter(activity =>
    (activity.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.activityDescription.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedStatuses.length === 0 || selectedStatuses.includes(activity.status))
  )

  const popoverContent = (
    <div>
      <Checkbox.Group
        options={status.map(s => ({ label: s.label, value: s.value }))}
        value={selectedStatuses}
        onChange={handleStatusChange}
      />
    </div>
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
          <Popover content={popoverContent} title="Status" trigger="click" placement="bottom">
            <FilterButton onClick={handleClick}/>
          </Popover>        </span>
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
