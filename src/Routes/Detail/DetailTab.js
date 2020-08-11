import React, { useState, useCallback } from "react";
import styled from "styled-components";

const Tabs = styled.div`
  opacity: 0.7;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  background-color: grey;
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  text-align: center;
  height: 380px;
  padding: 10px;
`;

const UL = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`;
const LI = styled.li`
  background-color: grey;
  opacity: 1;
  padding: 10px;
`;

const Item = styled.div`
  width: 100%;
  margin: 20px;
`;

const Iframe = styled.iframe`
  width: 300px;
  height: 300px;
`;

const Wrap = styled.div`
  text-align: center;
  font-size: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin: 10px;
`;

const Title = styled.div`
  font-size: 16pt;
  color: black;
  text-align: left;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
`;

const Label = styled.span`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
`;
const LabelName = styled.span``;
const ImageS = styled.img`
  width: 200px;
  height: 280px;
`;
const url = "https://image.tmdb.org/t/p/w200/";
const youTubeUrl = "https://www.youtube.com/embed/";

const Videos = ({ videos }) => {
  return (
    <Content>
      {videos.results !== null &&
        videos.results.map((video) => (
          <Item key={video.key}>
            <Iframe
              title={video.name}
              src={`${youTubeUrl}${video.key}`}
            ></Iframe>
          </Item>
        ))}
    </Content>
  );
};

const Production = ({ companies, countries }) => {
  return (
    <Content>
      <Item>
        <Title>[Companies]</Title>
        {companies !== null &&
          companies.map((company) => (
            <Wrap key={company.id}>
              <Label>
                {company.logo_path ? (
                  <Image src={`${url}${company.logo_path}`} alt="img" />
                ) : (
                  <Image
                    src={require("../../assets/noPosterSmall.png")}
                    alt="img"
                  />
                )}
              </Label>
              <LabelName>{company.name}</LabelName>
            </Wrap>
          ))}
      </Item>

      <Item>
        <Title>[Countries]</Title>
        {countries !== null &&
          countries.map((country, index) => (
            <Wrap key={index}>
              <Label> {country.iso_3166_1}</Label>
              <LabelName> {country.name} </LabelName>
            </Wrap>
          ))}
      </Item>
    </Content>
  );
};

const Seasons = ({ seasons }) => {
  return (
    <Content>
      {seasons !== null &&
        seasons.map((season) => (
          <Item>
            <div>
              {season.poster_path ? (
                <ImageS src={`${url}${season.poster_path}`} alt="img" />
              ) : (
                <ImageS
                  src={require("../../assets/noPosterSmall.png")}
                  alt="img"
                />
              )}
            </div>
            <LabelName> {season.name} </LabelName>
          </Item>
        ))}
    </Content>
  );
};

function DetailTab({ videos, companies, countries, seasons }) {
  const [tab, setTabs] = useState(0);
  const onChange = useCallback((tab) => {
    setTabs(tab);
  }, []);
  return (
    <Tabs>
      <UL>
        {videos && <LI onClick={() => onChange(0)}>Videos</LI>}
        {companies && <LI onClick={() => onChange(1)}>Production</LI>}
        {seasons && <LI onClick={() => onChange(2)}>Seasons</LI>}
      </UL>
      {tab === 0 && <Videos videos={videos} />}
      {tab === 1 && <Production companies={companies} countries={countries} />}
      {tab === 2 && <Seasons seasons={seasons} />}
    </Tabs>
  );
}

export default DetailTab;
