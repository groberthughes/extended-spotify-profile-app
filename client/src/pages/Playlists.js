import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUserPlaylists } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, PlaylistsGrid } from '../components';

const Playlists = () => {
    const [playlists, setPlaylists] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userPlaylists = await getCurrentUserPlaylists();
            setPlaylists(userPlaylists.data);
        };

        catchErrors(fetchData());
    }, []);

    return (
        <main>
        <SectionWrapper title="Public Playlists" breadcrumb={true}>
            {playlists && playlists.items && (
            <PlaylistsGrid playlists={playlists.items} />
            )}
        </SectionWrapper>
        </main>
    );
};

export default Playlists;