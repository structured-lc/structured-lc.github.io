### Leetcode 763 (Medium): Partition Labels [Practice](https://leetcode.com/problems/partition-labels)

### Description  
Given a string, partition it into as many parts as possible so that no letter appears in more than one part. After partitioning, concatenate all the parts back in order to get the original string. Return a list of the sizes of these parts. The key point: **each letter should appear in at most one part** — so if a character repeats, it determines how far right a partition can go.

### Examples  

**Example 1:**  
Input: `s = "ababcbacadefegdehijhklij"`  
Output: `[9,7,8]`  
*Explanation: The partitions are `"ababcbaca"`, `"defegde"`, `"hijhklij"`. Each letter occurs in at most one part. For example, 'a' only occurs in the first part, 'd' only in the second, etc.*

**Example 2:**  
Input: `s = "eccbbbbdec"`  
Output: ``  
*Explanation: All characters are repeated within the string, so the entire string forms a single partition.*

**Example 3:**  
Input: `s = "caedbdedda"`  
Output: `[1,9]`  
*Explanation: The first character 'c' does not repeat. The rest must be grouped since their occurrences overlap. So the partitions are "c" and "aedbdedda".*

### Thought Process (as if you’re the interviewee)  
Let's start simple:  
- **Brute-force idea:** For each character, look for all its occurrences in the string and try partitioning at indexes where up to that point no character's future occurrence leaks past. However, this would be **inefficient** (O(n²)), because you check every substring for future repeats.  

- **Optimized approach:**  
  1. *Record the last occurrence* of each character in the entire string.  
  2. As you scan left to right, for each character, track the farthest last occurrence seen so far.  
  3. When your current index matches this farthest last occurrence, it means the current partition can end here, as no character within it will appear later.  
  4. Record partition size, move the partition start pointer to the next index, repeat.

This is **greedy**: it always tries to finish the earliest current partition, looking only to the farthest necessary character.

### Corner cases to consider  
- Empty string input: should return an empty list.
- No repeated characters: each letter gets its own partition.
- All identical characters: the whole string is one partition.
- Overlapping character last positions (most common).
- Single character string.

### Solution

```python
def partitionLabels(s):
    # Step 1: Find last occurrence index for every character
    last = {}
    for i, c in enumerate(s):
        last[c] = i

    result = []
    j = anchor = 0  # j keeps track of hardest partition boundary, anchor is start of current partition

    for i, c in enumerate(s):
        j = max(j, last[c])
        # If current index is the last occurrence of all seen characters
        if i == j:
            # Partition end at this index
            result.append(i - anchor + 1)
            anchor = i + 1  # Next partition starts after current

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — where n is the length of the string, since we scan the string a *constant* number of times (once for last positions, once for partitions).
- **Space Complexity:** O(1) — Since there are at most 26 possible keys (letters a-z) in last, space is constant relative to input (if not counting the result/output list).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet was not limited to lowercase letters?
  *Hint: Does your solution need modification for Unicode or larger alphabets?*

- Can you do it in-place, modifying the list or original string, with no extra data structures?
  *Hint: Try to reason about pointer manipulation, but you still need information about character locations.*

- If the string was extremely long, how would you optimize for memory?
  *Hint: Think about doing the partitioning in one pass with minimal storage, or streaming + external storage.*

### Summary
This problem is a classic example of the **Greedy algorithm pattern** using the **two-pointer technique**. By recording the last positions, and expanding partitions to the farthest constraint, we solve efficiently in a single pass.  
The pattern of "expand window until you can be sure of a boundary" is seen in other partitioning and sliding window problems, such as **minimum window substring**, **split array into consecutive subsequences**, and certain greedy scheduling problems.