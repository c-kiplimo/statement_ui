import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./createGroupFor.module.css";

const CreateGroupFor = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const encodedGroupName = encodeURIComponent(groupName);
    const encodedDescription = encodeURIComponent(description);
    router.push(
      `/statement/user-management/user-groups/permissionsListPage?groupName=${encodedGroupName}&description=${encodedDescription}`
    );
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={`${styles.title} h5b`}>Create User Group</div>

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
      <button className={styles.button} type="submit">
        NEXT
      </button>
    </form>
  );
};

export default CreateGroupFor;
