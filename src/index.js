import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchBar';
import YTSearch from 'youtube-api-search'
import VideoList from './components/videoList'
import VideoDetail from './components/videoDetail'
import _ from 'lodash'



const API_KEY = "AIzaSyA7S8lH_NnzYjlFjC8W5is_JffZafOAR-8"

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos:[],
            selectedVideo: null
        };
        this.videoSearch('Table Tennis')
    }
    videoSearch(term){
        YTSearch({key:API_KEY, term:term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })
        })
    }

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},500);


        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={ selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));