import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './pagination.module.css';


const Pagination = ({ totalPages, currentPage, onPageChange }: any) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };


    return (
        <div className={styles.container}>
            <button
                className={styles.arrowButton}
                onClick={handlePrevClick}
                disabled={currentPage === 1 || totalPages <= 1}
            >
                <LeftOutlined />
            </button>
            <ul className={styles.pageNumber}>
                {pageNumbers.map(number => (
                    <li
                        key={number}
                        className={`${styles.pages} `}
                        onClick={() => onPageChange(number)}
                    >
                        <a href={'#'} className={`${styles.pageNavigation} ${currentPage === number ? styles.active: ''}`}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
            <button
                className={styles.arrowButton}
                onClick={handleNextClick}
                disabled={currentPage === totalPages || totalPages <= 1}
            >
                <RightOutlined />
                
            </button>
        </div>
    );
};

export default Pagination;
