import React from "react";

// Тип пропсов для пагинатора
type PaginationProps = {
    page: number,
    total: number,
    select: (page: number) => void,
}


const Pagination = ({page, total, select}: PaginationProps) => {

    return <div className="pagination-block">
        
        <button className={`${page === 1 ? "selected left" : "left"}${total === 1 ? " single" : ""}`} onClick={() => {select(1)}}>1</button>

        {page - 4 > 1 ? <button className="disabled">...</button> : null}

        {page - 3 > 1 ? <button onClick={() => {select(page - 3)}}>{page - 3}</button> : null}
        {page - 2 > 1 ? <button onClick={() => {select(page - 2)}}>{page - 2}</button> : null}
        {page - 1 > 1 ? <button onClick={() => {select(page - 1)}}>{page - 1}</button> : null}
        
        {page !== 1 && page !== total ? <button className="selected">{page}</button> : null}

        {page + 1 < total ? <button onClick={() => {select(page + 1)}}>{page + 1}</button> : null}
        {page + 2 < total ? <button onClick={() => {select(page + 2)}}>{page + 2}</button> : null}
        {page + 3 < total ? <button onClick={() => {select(page + 3)}}>{page + 3}</button> : null}

        {page + 4 < total ? <button className="disabled">...</button> : null}

        {total > 1 ? <button className={page === total ? "selected right" : "right"} onClick={() => {select(total)}}>{total}</button> : null}
        
    </div>
}

export default Pagination;