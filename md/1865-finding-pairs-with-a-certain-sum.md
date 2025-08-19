### Leetcode 1865 (Medium): Finding Pairs With a Certain Sum [Practice](https://leetcode.com/problems/finding-pairs-with-a-certain-sum)

### Description  
Given two integer arrays **nums1** and **nums2**, implement a data structure that supports:
- **add(index, val)**: Add a positive integer val to nums2[index].
- **count(tot)**: Return the number of pairs (i, j) with 0 ≤ i < nums1.length, 0 ≤ j < nums2.length, such that nums1[i] + nums2[j] = tot.  
The goal is to make these operations as efficient as possible.

### Examples  

**Example 1:**  
Input:  
nums1 = `[1, 1, 2, 2, 2, 3]`, nums2 = `[1, 4, 5, 2, 5, 4]`  
FindSumPairs.count(7)  
Output: `6`  
*Explanation: There are 6 pairs such that nums1[i] + nums2[j] = 7: (2,1),(2,4),(2,1),(2,4),(3,2),(3,2).*

**Example 2:**  
Input:  
FindSumPairs.add(3, 2)  
nums2 becomes `[1, 4, 5, 4, 5, 4]`  
FindSumPairs.count(8)  
Output: `2`  
*Explanation: 2 valid pairs: (2,3),(3,3) where nums1[2]=2 or nums1[3]=2 and nums2[3]=4.*

**Example 3:**  
Input:  
FindSumPairs.add(0, 1)  
nums2 becomes `[2, 4, 5, 4, 5, 4]`  
FindSumPairs.count(7)  
Output: `5`  
*Explanation: Now there are only 5 pairs such that nums1[i] + nums2[j] = 7 given the current nums2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each count query, loop over all i in nums1 and j in nums2, check if nums1[i]+nums2[j]==tot. This takes O(m\*n) per count call. Inefficient for large arrays or many calls.
- **Optimization:** Since nums1 is static and nums2 only changes by adding to a single element, we can precompute and always maintain a hashmap for nums2’s frequencies.
    - For count(tot): For each value x in nums1, calculate y = tot - x. Use the frequency map to add up how many y’s exist in nums2.
    - For add(index, val): Update nums2[index], and update the count map (decrement old value, increment new value). This keeps count(tot) fast.
- **Trade-off:** Slightly more space for the counter, but efficient count calls (O(m)), and add is O(1).

### Corner cases to consider  
- nums1 or nums2 being empty: no pairs are possible.
- Adding val that causes duplicates in nums2.
- All elements in nums2 the same.
- Add called enough times that values in nums2 get very large/out of normal constraints.
- count(tot) is called for a value not possible with any (nums1, nums2).
- Only one element in nums1 or nums2.

### Solution

```python
class FindSumPairs:
    def __init__(self, nums1, nums2):
        # Store nums1 and nums2 as lists
        self.nums1 = nums1
        self.nums2 = nums2
        
        # Build frequency map for nums2
        self.count2 = {}
        for num in nums2:
            self.count2[num] = self.count2.get(num, 0) + 1

    def add(self, index, val):
        # Remove old value from the count map
        old_val = self.nums2[index]
        self.count2[old_val] -= 1
        if self.count2[old_val] == 0:
            del self.count2[old_val]

        # Update nums2 and add new value to the count map
        self.nums2[index] += val
        new_val = self.nums2[index]
        self.count2[new_val] = self.count2.get(new_val, 0) + 1

    def count(self, tot):
        # For each x in nums1, look for y = tot - x in nums2 using count map
        result = 0
        for x in self.nums1:
            y = tot - x
            result += self.count2.get(y, 0)
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Constructor: O(n₁ + n₂), for building the frequency map.  
  - add: O(1), just map updates.
  - count: O(n₁), since we loop over nums1 (could also swap and use nums2 if it’s smaller).
- **Space Complexity:**  
  - O(n₂) for the counter/dictionary for nums2 (extra storage).
  - O(n₁ + n₂) for storing the two arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- If both nums1 and nums2 were allowed to change, how would you design your solution?
  *Hint: Maintaining two frequency maps and handling updates on both sides.*

- What if negative numbers or zeros are allowed in add and count?
  *Hint: Hashmaps handle all integers, but overflow or underflow must not be an issue in Python.*

- Suppose the array sizes grow very large and queries are extremely frequent, can this still work?
  *Hint: If queries dominate, try to optimize the loop by switching which list you iterate based on size.*

### Summary
This problem is a classic example of using **hashmaps for fast frequency counting with two-pointer or combination counting patterns**. It requires maintaining the latest state of an array under increment updates, and efficiently answering repeated pair-sum queries. This approach is reusable for problems asking, “How many pairs from two lists sum to x?” or any multiplicity-based combination counting with limited modification support.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design)

### Similar Problems
- Count Number of Pairs With Absolute Difference K(count-number-of-pairs-with-absolute-difference-k) (Easy)
- Number of Distinct Averages(number-of-distinct-averages) (Easy)
- Count the Number of Fair Pairs(count-the-number-of-fair-pairs) (Medium)