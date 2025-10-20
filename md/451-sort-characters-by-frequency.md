### Leetcode 451 (Medium): Sort Characters By Frequency [Practice](https://leetcode.com/problems/sort-characters-by-frequency)

### Description  
Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

### Examples  

**Example 1:**  
Input: `s = "tree"`  
Output: `"eert"`  
*Explanation: 'e' appears twice while 'r' and 't' both appear once. So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.*

**Example 2:**  
Input: `s = "cccaaa"`  
Output: `"aaaccc"`  
*Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers. Note that "cacaca" is incorrect, as the same characters must be together.*

**Example 3:**  
Input: `s = "Aabb"`  
Output: `"bbAa"`  
*Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect. Note that 'A' and 'a' are treated as two different characters.*

### Thought Process (as if you're the interviewee)  
This problem requires counting character frequencies and then sorting by frequency in descending order. The key insight is that characters with the same frequency can be arranged in any order relative to each other.

Approaches:
1. **Hash map + sorting**: Count frequencies, then sort by frequency - O(n log k) where k is unique characters
2. **Bucket sort**: Use frequency as bucket index for O(n) sorting - O(n) time
3. **Heap approach**: Use max heap to get characters by frequency - O(n log k)
4. **Counter + sorting**: Use built-in Counter and sort by frequency

The bucket sort approach is optimal since frequencies are bounded by string length, but hash map + sorting is more intuitive and still efficient.

### Corner cases to consider  
- Single character string
- All characters have same frequency
- All characters are unique
- Empty string (though constraints say length >= 1)
- Mixed case characters (A and a are different)
- String with digits and letters

### Solution

```python
def frequencySort(s):
    # Count frequency of each character
    char_count = {}
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Sort characters by frequency in descending order
    # If frequencies are equal, order doesn't matter
    sorted_chars = sorted(char_count.items(), key=lambda x: x[1], reverse=True)
    
    # Build result string
    result = []
    for char, count in sorted_chars:
        result.append(char * count)
    
    return ''.join(result)

# Alternative using Counter
def frequencySortCounter(s):
    from collections import Counter
    
    # Count frequencies
    counter = Counter(s)
    
    # Sort by frequency (descending)
    sorted_items = counter.most_common()
    
    # Build result
    result = []
    for char, count in sorted_items:
        result.append(char * count)
    
    return ''.join(result)

# Bucket sort approach - O(n) time
def frequencySortBucket(s):
    # Count frequencies
    char_count = {}
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Create buckets for each possible frequency
    # Maximum frequency is len(s)
    buckets = [[] for _ in range(len(s) + 1)]
    
    # Place characters in buckets based on frequency
    for char, count in char_count.items():
        buckets[count].append(char)
    
    # Build result from highest frequency to lowest
    result = []
    for freq in range(len(buckets) - 1, 0, -1):
        for char in buckets[freq]:
            result.append(char * freq)
    
    return ''.join(result)

# Heap approach
def frequencySortHeap(s):
    import heapq
    from collections import Counter
    
    # Count frequencies
    counter = Counter(s)
    
    # Use negative frequencies for max heap
    heap = [(-count, char) for char, count in counter.items()]
    heapq.heapify(heap)
    
    result = []
    while heap:
        neg_count, char = heapq.heappop(heap)
        count = -neg_count
        result.append(char * count)
    
    return ''.join(result)

# Manual counting approach
def frequencySortManual(s):
    # Count frequencies manually
    char_count = {}
    for char in s:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
    
    # Convert to list of tuples and sort
    char_freq_pairs = []
    for char, count in char_count.items():
        char_freq_pairs.append((char, count))
    
    # Sort by frequency (descending)
    char_freq_pairs.sort(key=lambda x: x[1], reverse=True)
    
    # Build result
    result = ""
    for char, count in char_freq_pairs:
        result += char * count
    
    return result

# Using defaultdict
def frequencySortDefaultDict(s):
    from collections import defaultdict
    
    # Count frequencies
    char_count = defaultdict(int)
    for char in s:
        char_count[char] += 1
    
    # Sort by frequency
    sorted_chars = sorted(char_count.items(), key=lambda x: x[1], reverse=True)
    
    # Build result
    result = []
    for char, count in sorted_chars:
        result.extend([char] * count)
    
    return ''.join(result)

# One-liner approach (less readable but compact)
def frequencySortOneLiner(s):
    from collections import Counter
    return ''.join(char * count for char, count in Counter(s).most_common())

# List-based approach
def frequencySortList(s):
    # Count frequencies
    char_count = {}
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Create list of (frequency, character) pairs
    freq_char_pairs = [(count, char) for char, count in char_count.items()]
    
    # Sort by frequency in descending order
    freq_char_pairs.sort(reverse=True)
    
    # Build result
    result = []
    for count, char in freq_char_pairs:
        result.append(char * count)
    
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k) where n is the length of string and k is the number of unique characters. Counting takes O(n), sorting takes O(k log k), and building result takes O(n).
- **Space Complexity:** O(n) for storing the character count map and the result string. In worst case when all characters are unique, we store O(n) entries in the map.

### Potential follow-up questions (as if you're the interviewer)  

- How would you optimize this if the string was extremely long but had very few unique characters?  
  *Hint: The bucket sort approach would be optimal since k (unique chars) is small, giving O(n) time complexity.*

- What if you needed to maintain stable sorting for characters with the same frequency?  
  *Hint: Modify the sorting key to include character value as secondary sort criteria.*

- How would you solve this if memory usage was critical and you couldn't store the entire result at once?  
  *Hint: Use a streaming approach where you output characters as you process them, using priority queue for ordering.*

- Can you solve this without using any built-in sorting functions?  
  *Hint: Implement bucket sort manually or use counting sort since frequencies are bounded.*

### Summary
This problem demonstrates frequency counting and custom sorting techniques. The key insight is that we need to group identical characters together and order these groups by frequency. The bucket sort approach is optimal for this problem since frequencies are bounded by string length, but the standard sorting approach is more general and easier to implement. This pattern appears frequently in problems involving frequency analysis, top-k elements, and custom ordering requirements.


### Flashcard
Count character frequencies, then sort or bucket-sort characters by frequency to build the result string in descending order.

### Tags
Hash Table(#hash-table), String(#string), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Bucket Sort(#bucket-sort), Counting(#counting)

### Similar Problems
- Top K Frequent Elements(top-k-frequent-elements) (Medium)
- First Unique Character in a String(first-unique-character-in-a-string) (Easy)
- Sort Array by Increasing Frequency(sort-array-by-increasing-frequency) (Easy)
- Percentage of Letter in String(percentage-of-letter-in-string) (Easy)
- Maximum Number of Pairs in Array(maximum-number-of-pairs-in-array) (Easy)
- Node With Highest Edge Score(node-with-highest-edge-score) (Medium)
- Most Frequent Even Element(most-frequent-even-element) (Easy)
- Count Pairs Of Similar Strings(count-pairs-of-similar-strings) (Easy)