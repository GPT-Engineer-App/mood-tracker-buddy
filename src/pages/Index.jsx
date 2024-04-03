import React, { useState, useEffect } from "react";
import { fetchMoods, createMood, updateMood, deleteMood } from "../api";
import { Box, Heading, Text, Button, Input, Select, Stack, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const activities = ["Work", "Exercise", "Relaxation", "Socializing", "Eating"];
const emojis = ["😊", "😐", "😢", "😡", "😴"];

const Index = () => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const getMoods = async () => {
      try {
        const fetchedMoods = await fetchMoods();
        setMoods(fetchedMoods);
      } catch (error) {
        console.error("Failed to fetch moods:", error);
      }
    };

    getMoods();
  }, []);
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState("");
  const [emoji, setEmoji] = useState("");
  const [editMoodId, setEditMoodId] = useState(null);

  const handleAddMood = async () => {
    if (description && activity && emoji) {
      const newMood = {
        description,
        activity,
        emoji,
      };
      try {
        await createMood(newMood);
        const updatedMoods = await fetchMoods();
        setMoods(updatedMoods);
        setDescription("");
        setActivity("");
        setEmoji("");
      } catch (error) {
        console.error("Failed to add mood:", error);
      }
    }
  };

  const handleUpdateMood = async () => {
    if (description && activity && emoji && editMoodId) {
      try {
        await updateMood(editMoodId, { description, activity, emoji });
        const updatedMoods = moods.map((mood) => (mood.id === editMoodId ? { ...mood, description, activity, emoji } : mood));
        setMoods(updatedMoods);
        setDescription("");
        setActivity("");
        setEmoji("");
        setEditMoodId(null);
      } catch (error) {
        console.error("Failed to update mood:", error);
      }
    }
  };

  const handleDeleteMood = async (id) => {
    await deleteMood(id);
    const updatedMoods = moods.filter((mood) => mood.id !== id);
    setMoods(updatedMoods);
  };

  const handleEditMood = (mood) => {
    setDescription(mood.description);
    setActivity(mood.activity);
    setEmoji(mood.emoji);
    setEditMoodId(mood.id);
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Mood Tracker
      </Heading>
      <Stack spacing={4}>
        <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Select placeholder="Select activity" value={activity} onChange={(e) => setActivity(e.target.value)}>
          {activities.map((activity) => (
            <option key={activity} value={activity}>
              {activity}
            </option>
          ))}
        </Select>
        <Select placeholder="Select emoji" value={emoji} onChange={(e) => setEmoji(e.target.value)}>
          {emojis.map((emoji) => (
            <option key={emoji} value={emoji}>
              {emoji}
            </option>
          ))}
        </Select>
        <Button colorScheme="blue" leftIcon={<FaPlus />} onClick={editMoodId ? handleUpdateMood : handleAddMood}>
          {editMoodId ? "Update Mood" : "Add Mood"}
        </Button>
      </Stack>
      <Box marginTop={8}>
        {moods.map((mood) => (
          <Box key={mood.id} borderWidth={1} borderRadius="md" padding={4} marginBottom={4}>
            <Flex alignItems="center">
              <Text fontWeight="bold">{mood.description}</Text>
              <Spacer />
              <IconButton icon={<FaEdit />} aria-label="Edit" onClick={() => handleEditMood(mood)} marginRight={2} />
              <IconButton icon={<FaTrash />} aria-label="Delete" onClick={() => handleDeleteMood(mood.id)} />
            </Flex>
            <Text>Activity: {mood.activity}</Text>
            <Text>Emoji: {mood.emoji}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(mood.createdAt).toLocaleString()}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
