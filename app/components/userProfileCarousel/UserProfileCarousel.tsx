import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const arrayDados = [
  {
    nome: "Leandro lombaldo da silva",
    descricao:
      "Desenvolvedor front end, estudando para se tornar um desenvolvedor full stack, gosta de desafios, e curte jogar um video game nas horas vagas.",
    image: "https://avatars.githubusercontent.com/u/11528359?v=4",
    github: "https://github.com/leandrolombaldo",
    linkedin: "https://www.linkedin.com/in/dev-leandro-lombaldo/",
    inLinkedIn: "in/dev-leandro-lombaldo",
  },
  {
    nome: "Leandro Gonçalves do Amaral",
    descricao: "Desenvolvedor",
    image:
      "https://media.licdn.com/dms/image/v2/C4D03AQHsi6a_afYS9Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1586549451100?e=1732752000&v=beta&t=LHC7RnnI7yj0BUetXbqNADGf9rJQP6zUyY9fbPukALw",
    github: "https://github.com/LeandroSiani",
    linkedin:
      "https://www.linkedin.com/in/leandro-gonçalves-do-amaral-b16667127/",
    inLinkedIn: "in/leandro-gonçalves-do-amaral-b16667127/",
  },
  {
    nome: "Lucas Almeida Costa",
    descricao:
      "Desenvolvedor Full-Stack, estou iniciando na área e gosto muito de tecnologia!",
    image: "https://avatars.githubusercontent.com/u/100805407?v=4",
    github: "https://github.com/lucascwtch",
    linkedin: "https://www.linkedin.com/in/lucas-ac/",
    inLinkedIn: "/in/lucas-ac/",
  },
];

export default function UserProfileCarousel() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % arrayDados.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ shadowColor: "red" }}>
      <FlatList
        ref={flatListRef}
        data={arrayDados}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{ zIndex: 999 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.description}>{item.descricao}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    marginTop: 5,
    marginBottom: 10,
    height: 180,
    backgroundColor: "#0B1B2B",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 9,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    color: "#E7EDF4",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#AFC2D4",
    fontSize: 10,
    textAlign: "center",
  },
});
