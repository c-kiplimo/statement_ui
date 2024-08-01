import React, { useState } from 'react'
import styles from "./update.user.group.module.css"

const UpdateUserGroup = () => {
 
      const [groupName, setGroupName] = useState('');
      const [description, setDescription] = useState('');
    
      const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
      };
    
      return (
        <form className={styles.container} onSubmit={handleSubmit}>
          <div className={`${styles.title} h5b`}>Update User Group</div>
    
          <div className={styles.inputbinding}>
            <label className={`${styles.titleStyle} bodyr`}>
                <span>Group Name</span>
                <span className={styles.asteric}>*</span>
                </label>
            <input
              id="groupName"
              required
              title="Group Name"
              placeholder="Enter group name"
              className={styles.label}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
    
          <div className={styles.inputbinding}>
            <label className={`${styles.titleStyle} bodyr`}>Description</label>
            <input
              id="description"
              title="Description"
              placeholder="Enter Description"
              className={styles.label}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className={styles.button} type="submit">Save Changes</button>
        </form>
      );
    };
    
export default UpdateUserGroup