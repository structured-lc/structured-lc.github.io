### Leetcode 128 (Medium): Longest Consecutive Sequence [Practice](https://leetcode.com/problems/longest-consecutive-sequence)

### Description  
Given an unsorted array of integers, find the length of the **longest consecutive elements sequence** (elements appearing in increasing order by 1 each). The sequence does **not** need to be contiguous in the array, and the array can contain duplicates or be unordered.  
For example: If given `[100, 4, 200, 1, 3, 2]`, the longest consecutive sequence is `[1, 2, 3, 4]`, which has a length of 4.  
Your task is to return the length of such a sequence.

### Examples  

**Example 1:**  
Input: `[100, 4, 200, 1, 3, 2]`  
Output: `4`  
*Explanation: The sequence `[1, 2, 3, 4]` is the longest consecutive one possible in any order of input.*

**Example 2:**  
Input: `[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]`  
Output: `9`  
*Explanation: The sequence `[0, 1, 2, 3, 4, 5, 6, 7, 8]` is length 9.*

**Example 3:**  
Input: `[1, 2, 0, 1]`  
Output: `3`  
*Explanation: The sequence `[0, 1, 2]` is the longest consecutive, duplicates are ignored.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For every number, try to build the consecutive sequence by checking if the next number exists in the array. Repeat for each number, mark numbers as visited to avoid reprocessing.  
  - Major issue: Checking for presence in a list is O(n); doing this for every element gives O(n²) time, which is too slow.
- **Optimized idea:**  
  - To check quickly if a value is present, use a set (hash set).
  - For each value, check if it's the **start of a sequence** (i.e., value - 1 is not in the set).
  - From every sequence start, count upwards while next consecutive integers are in the set, counting sequence length.
  - Track maximum length found.
  - This approach ensures each sequence is found only once, and checking presence is O(1) due to the set.
- **Why this approach?**
  - Using a set reduces time to O(n).
  - Only considers the start of each chain, so avoids unnecessary work and duplicate counting.

### Corner cases to consider  
- Empty array ⇒ Output should be 0 (no sequence).
- All duplicates ⇒ Only one number, so length 1.
- One element ⇒ Output should be 1.
- No consecutive numbers ⇒ Longest sequence is 1.
- Large negative and positive numbers mixed together.
- Sequences that are not sorted in the input.

### Solution

```python
def longestConsecutive(nums):
    # Convert list to set for O(1) lookups and remove duplicates.
    num_set = set(nums)
    longest = 0

    # For each number, check if it's the start of a sequence.
    for num in num_set:
        # Start only if num-1 is not in set (sequence start).
        if num - 1 not in num_set:
            current = num
            length = 1

            # Count sequence upwards.
            while current + 1 in num_set:
                current += 1
                length += 1

            # Update maximum sequence length seen so far.
            longest = max(longest, length)

    return longest
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Because we insert all numbers into a set once (O(n)), then for each number we check only the starts of sequences, traversing every element at most once.
- **Space Complexity:** O(n)  
  The set holds all unique elements in the input, so at most O(n) extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the array is **huge and doesn’t fit in memory**?  
  *Hint: Think about processing chunks, using external memory, or counting-sort inspired techniques.*

- What if **duplicates must be counted** in the consecutive sequence (e.g., `[1,1,2,2,3,3]` should return 6)?  
  *Hint: Consider mapping element value to count, or adapting logic to count duplicates.*

- How would you **return the sequence itself**, not just its length?  
  *Hint: Store start and end of the longest run, or record sequence elements as you find them.*

### Summary
This problem is a classic example of using a hash set for fast lookup and deduplication patterns. The approach avoids repeated work by only starting chains at sequence beginnings, ensuring every integer is considered at most twice. The coding technique translates well to other scenarios involving range detection, hash-based scanning, and is particularly useful in problems building on **set-based O(n)** logic.

### Tags
Array(#array), Hash Table(#hash-table), Union Find(#union-find)

### Similar Problems
- Binary Tree Longest Consecutive Sequence(binary-tree-longest-consecutive-sequence) (Medium)
- Find Three Consecutive Integers That Sum to a Given Number(find-three-consecutive-integers-that-sum-to-a-given-number) (Medium)
- Maximum Consecutive Floors Without Special Floors(maximum-consecutive-floors-without-special-floors) (Medium)
- Length of the Longest Alphabetical Continuous Substring(length-of-the-longest-alphabetical-continuous-substring) (Medium)
- Find the Maximum Number of Elements in Subset(find-the-maximum-number-of-elements-in-subset) (Medium)