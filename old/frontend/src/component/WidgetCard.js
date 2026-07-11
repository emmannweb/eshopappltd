import React from 'react'

const WidgetCard = ({ colorClass, iconName, name, stat, unit }) => {
    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="card card-stats">
                    <div className={`card-header  card-header-icon ${colorClass}`}>
                        <div className="card-icon">
                            <i className="material-icons">{iconName}</i>
                        </div>
                        <p className="card-category">{name}</p>
                        <h3 className="card-title">{stat}
                            <small>{unit}</small>
                        </h3>
                    </div>
                    <div className="card-footer">
                        <div className="stats">
                            {/* <i className="material-icons text-danger">warning</i>
                            <a href="javascript:;">Get More Space...</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WidgetCard