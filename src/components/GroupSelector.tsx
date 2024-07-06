import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setGroup } from '../slices/groupSlice';
import {useGetUsersGroupsQuery } from '../services/usergroup.api.ts';
import {Form} from "react-bootstrap";

const GroupSelector = () => {
    const dispatch = useDispatch();
    const { data: groups } = useGetUsersGroupsQuery();
    const currentGroupId = useSelector((state: RootState) => state.group.currentGroupId);

    useEffect(() => {
        if (groups && groups.length > 0 && !currentGroupId) {
            dispatch(setGroup({ groupId: groups[0].id, groupName: groups[0].name }));
        }
    }, [groups, currentGroupId, dispatch]);

    const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = groups && groups.find(group => group.id === parseInt(event.target.value));
        if (selectedGroup) {
            dispatch(setGroup({ groupId: selectedGroup.id, groupName: selectedGroup.name }));
        }
    };

    return (
        <div>
            <Form.Group className='my-2' controlId='groupSelect'>
                <Form.Label>Menu Planning Group</Form.Label>
                <Form.Select
                    value={currentGroupId || ''}
                    onChange = {handleGroupChange} >
                    <option value=''>Select a group</option>
                    {groups && groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
};

export default GroupSelector;
