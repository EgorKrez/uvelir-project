// 'use client';

import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';

// declare var ymaps;

export default function MiniMap() {
    const defaultState = {
        center: [52.094924, 23.689383],
        zoom: 18
    };

    return <YMaps>
        <Map
            width={900}
            height={500}
            defaultState={defaultState}>
            <Placemark geometry={[52.094738, 23.689655]}/>
        </Map>
    </YMaps>;
}
