"use client";
import React, { useEffect, useState,Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import { createUserHandler } from "@/src/services/usermanagement/create.user.service";

const Dev = () => {
  const [groups, setGroups] = useState<PlatformGroup[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Create an instance of createUserHandler
    const { fetchPlatformGroupService } = createUserHandler();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                // Call fetchPlatformGroupService with a specific platform ID
                const platformId = 1; // Replace with the actual platform ID you want to use
                const data = await fetchPlatformGroupService(platformId);
                setGroups(data);
            } catch (error) {
                setError('Failed to fetch platform groups');
            }
        };

        fetchGroups();
    }, [fetchPlatformGroupService]); // Dependency array ensures this effect runs once

  return (
    <Fragment>
       <div>
            <h1>Platform Groups</h1>
            {error && <p>{error}</p>}
            <ul>
                {groups.map((group) => (
                    <li key={group.groupId}>
                        <h2>{group.groupName}</h2>
                        <p>{group.description}</p>
                        <p>Created At: {new Date(group.createdAt).toLocaleString()}</p>
                        <p>Permissions: {group.permission.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    </Fragment>
  );
};

export default withContainer(Dev);

