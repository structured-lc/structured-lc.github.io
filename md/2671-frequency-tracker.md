### Leetcode 2671 (Medium): Frequency Tracker [Practice](https://leetcode.com/problems/frequency-tracker)

### Description  
Design a data structure `FrequencyTracker` that efficiently tracks and updates the count of integer values you add or delete, and can answer if any number in the data structure appears exactly a given number of times. There are three main operations:
- `add(number)`: Add `number` to the tracker.
- `deleteOne(number)`: Remove one occurrence of `number` (if it exists).
- `hasFrequency(frequency)`: Returns true if there is any number present with exactly `frequency` occurrences.

### Examples  

**Example 1:**  
Input: `["FrequencyTracker","add","add","hasFrequency"]`, `[[],[3],[3],[2]]`  
Output: `[null,null,null,true]`  
Explanation:  
- Constructor creates an empty tracker.  
- Add 3 ⇒ count of 3 becomes 1.  
- Add 3 again ⇒ count of 3 becomes 2.  
- `hasFrequency(2)` ⇒ returns true (number 3 appears 2 times).

**Example 2:**  
Input: `["FrequencyTracker","add","add","add","deleteOne","hasFrequency"]`, `[[],[5],[5],[5],[5],[3]]`  
Output: `[null,null,null,null,null,true]`  
Explanation:  
- Add 5 three times (count becomes 3).
- Delete one 5 (count becomes 2).
- `hasFrequency(2)` would return true.
- `hasFrequency(3)` returns false because there is no number now with frequency 3.

**Example 3:**  
Input: `["FrequencyTracker","add","add","deleteOne","hasFrequency"]`, `[[],,,,[1]]`  
Output: `[null,null,null,null,true]`  
Explanation:  
- Add 10 and 20.
- Delete one 10 (now only 20 remains with frequency 1).
- `hasFrequency(1)` returns true (number 20 appears once).

### Thought Process (as if you’re the interviewee)  
A brute-force idea would be:  
- Track each number and its count in a hash map.
- For `hasFrequency`, scan all counts and see if any number appears with the requested frequency.

Problem: The `hasFrequency` operation would then be O(n) per query, which is too slow for many operations.

To optimize, we use **two hash maps**:  
- **count_map**: key = number, value = its count.
- **freq_map**: key = count value, value = how many numbers currently have that count.

This lets us update both number counts and, in O(1), see if any number(s) exist with a particular frequency, as `freq_map[frequency] > 0`.

Every time we add or remove a number, we:
- Update its count in `count_map`.
- Decrement the count of the old frequency in `freq_map`.
- Increment the count of the new frequency in `freq_map`.

This pattern makes all operations O(1) time.

### Corner cases to consider  
- Adding a number that’s never been present before.
- Deleting a number not present: should be a no-op.
- `deleteOne` should remove the number from both maps if its count drops to 0.
- Multiple numbers can have the same frequency.
- Querying frequencies that do not exist (e.g. very large numbers).
- Deleting until frequency is 0, then double-deleting (should do nothing extra).
- Adding and deleting the same number many times, confirming all maps update correctly.

### Solution

```python
class FrequencyTracker:
    def __init__(self):
        # count_map: stores count of each number
        self.count_map = {}  # number: count
        # freq_map: stores number of elements having a specific frequency
        self.freq_map = {}   # frequency: count of numbers with this frequency

    def add(self, number: int) -> None:
        prev_count = self.count_map.get(number, 0)
        new_count = prev_count + 1
        
        # Update freq_map for previous and new count
        if prev_count > 0:
            self.freq_map[prev_count] -= 1
            if self.freq_map[prev_count] == 0:
                del self.freq_map[prev_count]
        
        self.count_map[number] = new_count
        self.freq_map[new_count] = self.freq_map.get(new_count, 0) + 1

    def deleteOne(self, number: int) -> None:
        if number not in self.count_map or self.count_map[number] == 0:
            return
        
        prev_count = self.count_map[number]
        new_count = prev_count - 1
        
        self.freq_map[prev_count] -= 1
        if self.freq_map[prev_count] == 0:
            del self.freq_map[prev_count]
        
        if new_count > 0:
            self.count_map[number] = new_count
            self.freq_map[new_count] = self.freq_map.get(new_count, 0) + 1
        else:
            del self.count_map[number]  # remove number completely

    def hasFrequency(self, frequency: int) -> bool:
        return self.freq_map.get(frequency, 0) > 0
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  All three operations (`add`, `deleteOne`, `hasFrequency`) run in **O(1)** time, as all updates and queries are single hash map lookups and assignments.

- **Space Complexity:**  
  O(n), where n is the number of unique numbers ever added to the tracker.
  Both `count_map` and `freq_map` can contain up to n distinct entries.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle negative numbers or floats?  
  *Hint: Adjust only if input constraints change; hash maps handle any hashable type.*

- Can you support bulk operations like adding or removing a number k times?  
  *Hint: Process counts directly and update maps with batch increments/decrements instead of single steps.*

- What if you had to support getting all numbers with a given frequency?  
  *Hint: You’d need a reverse map: frequency to set/list of numbers.*

### Summary
This problem is a solid example of the "two-hashmap" pattern, using one map for element-to-count and another for count-to-frequency. Such dual-tracking enables efficient O(1) queries for dynamic multi-frequency problems. This design pattern is common in "frequency query" or "count-data" interview questions and is directly applicable in problems like finding duplicates, leaderboards, word counts, and frequency analysis in streaming data.

### Tags
Hash Table(#hash-table), Design(#design)

### Similar Problems
