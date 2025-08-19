### Leetcode 2404 (Easy): Most Frequent Even Element [Practice](https://leetcode.com/problems/most-frequent-even-element)

### Description  
Given an array of integers, find the **even element** that appears most frequently.  
- If there’s a tie, return the **smallest** such element.  
- If there are **no even elements**, return `-1`.  
For example, given `[0, 1, 2, 2, 4, 4, 1]`, both 2 and 4 appear twice, but we return 2 because it’s smaller.

### Examples  

**Example 1:**  
Input: `[0, 1, 2, 2, 4, 4, 1]`  
Output: `2`  
*Explanation: Even elements are 0, 2, and 4. 2 and 4 both occur twice, so return the smallest: 2.*

**Example 2:**  
Input: `[4, 4, 4, 9, 2, 4]`  
Output: `4`  
*Explanation: 4 is the only even element that appears the most (four times).*

**Example 3:**  
Input: `[29, 47, 21, 41, 13, 37, 25, 7]`  
Output: `-1`  
*Explanation: There are no even elements. Return -1.*

### Thought Process (as if you’re the interviewee)  
First, I’d check if the array contains any even elements at all.  
The brute-force way is:
- Loop through the list, filter out even numbers, and count their frequencies (e.g., with a hashmap).
- Find the maximum frequency among those counts.
- For ties, select the smallest even number with that frequency.

To optimize:
- Do it in a single pass: as I iterate, count each even element’s frequency in a dictionary.
- After finishing the scan, go through the dictionary to find the most frequent entry. In case of ties, keep track of the smallest.

This approach is efficient and avoids unnecessary repetitions.  
Trade-offs: The only real resource is space for the frequency dictionary (but with possible values 0 to 10⁵).

### Corner cases to consider  
- Array has **no even numbers** (e.g., `[1, 3, 5]` → `-1`)
- All numbers are the **same even number** (e.g., `[2, 2, 2]`)
- **Multiple even numbers** with the same count (ensure we select the *smallest*)
- **Negative even numbers** if allowed (not needed here as input is 0 to 10⁵)
- **Single element** array (e.g., `[2]` or `[3]`)
- **Very large arrays** up to 2000 elements (check efficiency)

### Solution

```python
def mostFrequentEven(nums):
    # Dictionary to count frequency of even numbers
    freq = {}
    for num in nums:
        if num % 2 == 0:
            if num in freq:
                freq[num] += 1
            else:
                freq[num] = 1
    
    # If no even elements found, return -1
    if not freq:
        return -1

    # Track the max frequency and corresponding smallest even number
    max_freq = 0
    result = -1

    for num in freq:
        count = freq[num]
        if count > max_freq or (count == max_freq and num < result):
            max_freq = count
            result = num

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We iterate through nums once to count (O(n)), then iterate through the small frequency dictionary (at most n entries).
- **Space Complexity:** O(n) in the worst case if all elements are different even numbers (up to n distinct entries in freq).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to find the most frequent **odd** element instead?  
  *Hint: Change the filter condition from `num % 2 == 0` to `num % 2 == 1`.*

- How would you handle this if the array were streamed and too big to hold in memory?  
  *Hint: Use a frequency counter with a fixed window, or track only the top k frequent elements using heaps.*

- Could you do this in a single loop without an explicit second pass for the answer?  
  *Hint: Track max count and min-value-so-far as you update counts in the same pass.*

### Summary
This problem uses the classic **frequency counting** pattern—a hashmap to tally occurrences, followed by a tie-breaker based on value. This pattern applies to other frequency-based problems (e.g., finding top k frequent elements). Filtering while counting saves time and space. The tie-breaking requirement (smallest element) is a common interview twist.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Majority Element(majority-element) (Easy)
- Majority Element II(majority-element-ii) (Medium)
- Top K Frequent Elements(top-k-frequent-elements) (Medium)
- Sort Characters By Frequency(sort-characters-by-frequency) (Medium)