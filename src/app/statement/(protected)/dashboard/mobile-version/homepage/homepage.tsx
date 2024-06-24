import React, { CSSProperties, ReactNode, useState } from 'react';
import styles from './homepage.module.css';
import VerticalInfoDescription from '@/src/components/atoms/text/vertical-info-description';
import CustomButton from '@/src/components/atoms/button/custom.button';
import Pagination from '@/src/components/atoms/pagination/pagination';
import PaginationWithoutPageNumber from '@/src/components/atoms/pagination/paginationwithoutNumber';

export interface TranSactionHistoryHome {
    key: React.Key;
    account: string;
    dateTime: string;
    time?: string;
    number: string;
    description: string;
    currency?: string;
    status: string;
    icon?: ReactNode;
}

interface PeriodTypes {
    key: number;
    value: string;
    period: string;
}

type HomePageprops = {
    transactions: TranSactionHistoryHome[];
    options: PeriodTypes[];
};

const HomePageMobileVersion = (props: HomePageprops) => {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 2;
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const currentTransactions = props.transactions.slice(startIndex, endIndex);

    const totalPages = Math.ceil(props.transactions.length / transactionsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <VerticalInfoDescription title={'Transaction History'} titleStyle={{ fontWeight: '700' }} />
                <div>
                    <div className={styles.headerIcons}>
                        <HomePageMobileVersion.Selection options={props.options} />
                        <HomePageMobileVersion.Icon
                            icon={<img src="/delete.svg" />}
                        />
                        <HomePageMobileVersion.Icon
                            icon={<img src="/funnel.svg" />}
                        />
                        <HomePageMobileVersion.Icon
                            icon={<img src="/sort.svg" />}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.table}>
                {currentTransactions.map(data => (
                    <div key={data.key} className={styles.tablecontent}>
                        <HomePageMobileVersion.TableText title='Account Type' description={data.account} />
                        <HomePageMobileVersion.TableText title='Date' description={data.dateTime} />
                        <HomePageMobileVersion.TableText title='Number' description={data.number} />
                        <HomePageMobileVersion.TableText title='Description' description={data.description} />
                        <HomePageMobileVersion.TableText
                            title='Status'
                            description={data.status}
                            descriptionStyles={{
                                color: data.status.toLowerCase() === 'completed' ? '#84BD00' : '#FFBD66',
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <PaginationWithoutPageNumber
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default HomePageMobileVersion;

type TableTextProps = {
    title: string;
    titleStyles?: CSSProperties;
    description: string;
    descriptionStyles?: CSSProperties;
};

HomePageMobileVersion.TableText = (props: TableTextProps) => (
    <div className={styles.textstyle}>
        <span className={`${styles.title} captionm`} style={props.titleStyles}>{props.title}</span>
        <span className={`${styles.description} captionr`} style={props.descriptionStyles}>{props.description}</span>
    </div>
);

type IconProps = {
    icon?: ReactNode;
    labelStyle?: CSSProperties;
    iconStyle?: CSSProperties;
};

HomePageMobileVersion.Icon = (props: IconProps) => (
    <CustomButton
        buttonName={''}
        icon={props.icon}
        buttonStyle={{
            backgroundColor: "transparent",
            border: "1px solid #E6E6E6",
            display: "flex",
            padding: "1px 8px",
            justifyContent: 'center',
            width: "24px",
            height: "19px",
            borderRadius: "2px",
            alignItems: "center",
        }}
    />
);

type SelectionProps = {
    options: PeriodTypes[];
};

HomePageMobileVersion.Selection = (props: SelectionProps) => {
    return (
        <div>
            <select name="period" id="period" className={styles.selection}>
                {props.options.map((option) => (
                    <option key={option.key} value={option.value}>{option.period}</option>
                ))}
            </select>
        </div>
    );
};
