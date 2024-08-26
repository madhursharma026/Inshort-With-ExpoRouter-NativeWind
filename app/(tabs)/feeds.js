import { APIURL } from "../../api/api";
import Carousel from "react-native-snap-carousel";
import React, { useState, useEffect } from "react";
import SingleNews from "../../components/SingleNews";
import { useLanguage } from "../../context/LanguageContext";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

const GET_NEWS_BY_LANGUAGE_QUERY = gql`
  query GetNewsByLanguage($language: String!) {
    newsByLanguage(language: $language) {
      id
      author
      description
      publishedAt
      readMoreContent
      title
      url
      urlToImage
      language
    }
  }
`;

const FeedsScreen = () => {
  const dynamicStyles = UseDynamicStyles();
  const { language } = useLanguage(); // Use selected language
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await client.query({
          query: GET_NEWS_BY_LANGUAGE_QUERY,
          variables: { language },
        });
        setArticles(data.newsByLanguage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language]); // Refetch articles whenever language changes

  const renderCarouselItem = ({ item, index }) => (
    <SingleNews item={item} index={index} />
  );

  const renderContent = () => {
    if (loading) {
      return (
        <Text style={[styles.messageText, dynamicStyles.textColor]}>
          Loading articles...
        </Text>
      );
    }
    if (error) {
      return (
        <Text style={[styles.messageText, dynamicStyles.textColor]}>
          Error: {error}
        </Text>
      );
    }
    if (articles.length === 0) {
      return (
        <Text style={[styles.messageText, dynamicStyles.textColor]}>
          No articles available
        </Text>
      );
    }
    return (
      <Carousel
        layout="default"
        data={articles}
        sliderHeight={windowHeight}
        itemHeight={windowHeight}
        vertical
        renderItem={renderCarouselItem}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
    );
  };

  return (
    <View style={[styles.container, dynamicStyles.backgroundColor]}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default FeedsScreen;
