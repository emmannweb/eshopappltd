import React from 'react'

const WidgetCard = ({ colorClass, iconName, name, stat, unit }) => {
    return (
        <>
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="card card-stats">
                    <div class={`card-header  card-header-icon ${colorClass}`}>
                        <div class="card-icon">
                            <i class="material-icons">{iconName}</i>
                        </div>
                        <p class="card-category">{name}</p>
                        <h3 class="card-title">{stat}
                            <small>{unit}</small>
                        </h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            {/* <i class="material-icons text-danger">warning</i>
                            <a href="javascript:;">Get More Space...</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WidgetCard