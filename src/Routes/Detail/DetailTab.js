import React, { useState, useCallback } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  border: none;
  margin-top: 20px;
  padding: 10px;
`;
const Tabs = styled.div``;
const TabContent = styled.div`
  background-color: white;
  z-index: 0;
  color: black;
`;

const url = "https://image.tmdb.org/t/p/w200/";
const youTubeUrl = "https://www.youtube.com/embed/";

const Videos = ({ videos }) => {
  return (
    <div style={{ display: "flex" }}>
      {videos.results !== null &&
        videos.results.map((video) => (
          <div key={video.key}>
            <iframe
              title={video.name}
              src={`${youTubeUrl}${video.key}`}
            ></iframe>
          </div>
        ))}
    </div>
  );
};

const Production = ({ companies, countries }) => {
  console.log(companies);
  return (
    <div style={{ display: "flex" }}>
      <div>
        <span>Companies</span>
        {companies !== null &&
          companies.map((company) => (
            <div
              key={company.id}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>
                <img
                  src={`${url}${company.logo_path}`}
                  alt="img"
                  style={{ width: "35px", height: "35px" }}
                />
              </span>
              <span> {company.name} </span>
            </div>
          ))}
      </div>

      <div>
        <span>Countries</span>
        {countries !== null &&
          countries.map((country, index) => (
            <div
              key={index}
              style={{
                display: "flex",

                alignItems: "center",
              }}
            >
              <div>
                <span>{country.iso_3166_1}</span>
                <span> {country.name} </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Seasons = ({ seasons }) => {
  return (
    <div style={{ display: "flex" }}>
      {seasons !== null &&
        seasons.map((season) => (
          <div>
            <div>
              {season.poster_path ? (
                <img src={`${url}${season.poster_path}`} alt="img" />
              ) : (
                <div style={{ width: "200px", height: "300px" }}></div>
              )}
            </div>

            <div> {season.name} </div>
          </div>
        ))}
    </div>
  );
};

function DetailTab({ videos, companies, countries, seasons }) {
  const [tab, setTabs] = useState(0);
  console.log(companies);
  return (
    <Tabs>
      {videos && <Button onClick={() => setTabs(0)}>Videos</Button>}
      {companies && <Button onClick={() => setTabs(1)}>Production</Button>}
      {seasons && <Button onClick={() => setTabs(2)}>Seasons</Button>}
      <TabContent>
        {tab === 0 && <Videos videos={videos} />}
        {tab === 1 && (
          <Production companies={companies} countries={countries} />
        )}
        {tab === 2 && <Seasons seasons={seasons} />}
      </TabContent>
    </Tabs>
  );
}

export default DetailTab;
