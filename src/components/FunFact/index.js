import React from 'react'

const funFact = [
    {
        title: '50+',
        subTitle: 'Habitaciones',
    },
    {
        title: '10+',
        subTitle: 'Atracciones',
    },
    {
        title: '20+',
        subTitle: 'Comidas deliciosas',
    },
    {
        title: '15',
        subTitle: 'Albercas',
    },


]


const FunFact = (props) => {
    return (
        <section className={`wpo-fun-fact-section ${props.fClass}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="wpo-fun-fact-grids clearfix">
                            {funFact.map((funfact, fitem) => (
                                <div className="grid" key={fitem}>
                                    <div className="info">
                                        <h3>{funfact.title}</h3>
                                        <p>{funfact.subTitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FunFact;