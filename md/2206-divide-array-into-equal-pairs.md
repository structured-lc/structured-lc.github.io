### Leetcode 2206 (Easy): Divide Array Into Equal Pairs [Practice](https://leetcode.com/problems/divide-array-into-equal-pairs)

### Description  
Given an array `nums` with 2 × n integers, determine if it's possible to divide the array into n pairs such that:
- Each pair contains two *equal* elements.
- Every element is used in exactly one pair.

In other words, can you group all elements into pairs of identical numbers so that no element is left out or reused?

### Examples  

**Example 1:**  
Input: `nums = [3,2,3,2,2,2]`  
Output: `true`  
*Explanation: There are 6 elements ⇒ 3 pairs needed. Valid grouping: (2,2), (2,2), (3,3). All pairs have equal elements.*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `false`  
*Explanation: Grouping needed: 2 pairs. Possible pairs: none, since every value is unique. Can't pair all elements with a duplicate.*

**Example 3:**  
Input: `nums = [5,5,5,5]`  
Output: `true`  
*Explanation: Grouping needed: 2 pairs. (5,5) and (5,5) use all elements in pairs with equal numbers.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible way to split the array into pairs, checking if every pair is equal. This would require checking all possible pairings, which is extremely slow (\(O((2n)!)\), completely impractical).

- **Observation:**  
  Each element *must* appear an even number of times. Otherwise, there will always be at least one element that can't be paired. So, count the frequency of every number.

- **Efficient approach:**  
  Use a counting technique:
    - Traverse the array once, noting the count for each unique value.
    - If any value occurs an odd number of times, return `False`.
    - If all counts are even, all numbers can be placed into equal pairs and return `True`.

- **Alternative (Sorting):**  
  If you sort the array, equal elements end up next to each other. Walk in steps of 2 and check whether each pair is equal. If so for all pairs: return `True`. If any adjacent pair differs: return `False`.

- **Trade-offs:**  
  - Counting: \(O(n)\) time, possibly extra space for counts.
  - Sorting: \(O(n \log n)\) time, but can avoid explicit counting storage.

### Corner cases to consider  
- Empty array (shouldn't happen, per constraints).
- All elements are the same.
- Some elements with an odd count (e.g., [1,1,2]).
- Already paired up but in unsorted/random order.
- The largest possible array (test performance).

### Solution

```python
def divideArray(nums):
    # Create a fixed-size array for counts (since 1 ≤ nums[i] ≤ 500)
    count = [0] * 501

    # Count frequency of each value
    for num in nums:
        count[num] += 1

    # If any number has odd count, pairing is impossible
    for c in count:
        if c % 2 != 0:
            return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums. We count frequencies in one pass, then check counts in a fixed (constant) second pass.
- **Space Complexity:** O(1), since the counts array is always of length 501 (for nums[i] in 1..500), independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if numbers can be negative, or range up to \(10^9\)?
  *Hint: How would you generalize your counting structure if you can't use a fixed array?*

- Can you do it in-place without extra memory?
  *Hint: Is it necessary to store explicit counts, or can sorting help?*

- What if, instead of pairs, you had to group into k-equal groups?
  *Hint: What does grouping into k-equal sets tell you about the required frequency of elements?*

### Summary
This problem is a classic “counting/frequency” pattern. The core insight is every unique number’s frequency must be even to allow equal pairing. The typical approach either counts frequencies using an array or hash map, or sorts the array and checks adjacent pairs. This technique often applies to problems involving making pairs, groups, or partitions where element equality matters.

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Counting(#counting)

### Similar Problems
- Sort Array by Increasing Frequency(sort-array-by-increasing-frequency) (Easy)
- Distribute Elements Into Two Arrays I(distribute-elements-into-two-arrays-i) (Easy)
- Distribute Elements Into Two Arrays II(distribute-elements-into-two-arrays-ii) (Hard)