import React, { useEffect, useState, useCallback } from "react";
import {
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./restrictions.overview.module.css";
import CustomTable, { DataFetcher } from "../../widgets/table/table";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import AddItem from "@/src/components/atoms/add-item/add.item";
import RemoveRestrictionModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/remove-from-page/restriction/remove.restriction";
import EditPageModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/edit-page/edit.page";
import { RestrictionsAction } from "@/src/lib/actions/customer.restrictions.action";
import CreateRestrictionModal, {
  EntriesProps,
} from "../../account-restrictions/restrictions";
import { AllAccountRestrictionsAction } from "@/src/lib/actions/all.restrictions.action";

interface DataType {
  id?: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
  currency?: string;
  userId?: number;
  restrictionId?: number;
  entryId?: number;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}

interface RestrictionsOverviewProps {
  userId?: number;
}

const RestrictionsOverview: React.FC<RestrictionsOverviewProps> = (props) => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [data, setData] = useState<DataFetcher[]>([]);
  const [dataId, setDataId] = useState<number | null>(null);
  const [datain, setdatain] = useState<EntriesProps[]>([]);

  const fetchData = useCallback(async () => {
    try {
      let incomingTableData = await RestrictionsAction(props.userId!);
      setData(incomingTableData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [props.userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AllAccountRestrictionsAction();
        setdatain(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRemoveClick = useCallback((entryId: number) => {
    setDataId(entryId);
    setModalVisible2(true);
    fetchData();
  }, []);

  const handleEditClick = useCallback((restrictionId: number) => {
    setDataId(restrictionId);
    setModalVisible3(true);
    fetchData();
  }, []);

  const handleAddRestrictionSubmit = () => {
    setModalVisible1(false);
    fetchData();
  };

  const columns: Datatype[] = [
    {
      title: "Date",
      dataIndex: "createdOn",
      render: (text: string) => {
        const dateTime = new Date(text);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return (
          <div className={styles.createdOn}>
            <div className={styles.dateStyles}>{date}</div>
            <div className={styles.timestyles}>{time}</div>
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text) => <span className={styles.columnstyles}>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "role",
      render: (text) => <span className={styles.columnstyles}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => <span className={styles.activediv}>{text}</span>,
    },
    {
      title: "",
      dataIndex: "icons",
      render: (_text, record) => (
        <button className={styles.iconsdiv}>
          <div className={styles.icons}>
            <EyeOutlined key="eye" />
            <MinusOutlined
              key="minus"
              onClick={() => handleRemoveClick(record.entryId!)}
            />
            <EditOutlined
              key="edit"
              onClick={() => handleEditClick(record.restrictionId!)}
            />
          </div>
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerdiv}>
          <div className={styles.textdiv}>Restrictions</div>
          <div className={styles.atomsdiv}>
            <Search
              key="search"
              title={"Search..."}
              icon={<img src="/searchicon.svg" alt="searchicon" />}
            />
            <Filter
              key="filter"
              title={"Filter"}
              icon={<img src="/funnel.svg" alt="funnel" />}
            />
            <Sort
              key="sort"
              title={"Sort"}
              icon={<img src="/sort.svg" alt="sort" />}
            />
            <AddItem
              key="add"
              title={"Add Restriction"}
              icon={<PlusOutlined />}
              iconStyle={{ color: "gray" }}
              titleStyle={{ color: "gray" }}
              onClick={() => setModalVisible1(true)}
            />
          </div>
        </div>
        <CustomTable data={data} columns={columns} />
      </div>
      <CreateRestrictionModal
        titleName={"Restrictions"}
        addIcon={<img src="/addIcon.svg" alt="addIcon" />}
        filterIcon={<img src="/filterIcon.svg" alt="filterIcon" />}
        restrictionArray={datain}
        visible={modalVisible1}
        resId={props.userId!}
        onSubmit={handleAddRestrictionSubmit}
      />

      <RemoveRestrictionModal
        visible={modalVisible2}
        onCancel={() => setModalVisible2(false)}
        restrictionId={dataId!}
      />
      <EditPageModal
        visible={modalVisible3}
        onCancel={() => {
          setModalVisible3(false);
          setDataId(null);
        }}
        restrictionId={dataId}
      />
    </div>
  );
};

export default RestrictionsOverview;
