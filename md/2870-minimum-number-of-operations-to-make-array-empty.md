### Leetcode 2870 (Medium): Minimum Number of Operations to Make Array Empty [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-empty)

### Description  
You are given a 0-indexed array of positive integers. Your goal is to remove all elements from the array by doing one of two possible operations any number of times:
- **Delete two equal elements** (i.e., pick two elements with equal value and delete them),
- **Delete three equal elements**  
For each operation, the chosen elements must have equal value; you can apply any operation multiple times and in any order.  
**Return the minimum number of operations required to empty the array, or -1 if it is not possible.**

### Examples  

**Example 1:**  
Input: `nums = [2,3,3,2,2,4,2,3,4]`  
Output: `4`  
*Explanation: Count per value: 2→4, 3→3, 4→2.  
- Remove three 2's (operation 1), one op left: 2,2,3,3,4,4  
- Remove two 2's (operation 2), now 3,3,4,4  
- Remove two 3's (operation 3), now 4,4,3  
- Remove two 4's (operation 4), now just 3 left, but can't remove one value, so skip*  
*Correction: Instead, optimal grouping:  
- Remove three 2's: (2,2,2) → [3,3,3,2,4,4]  
- Remove three 3's: (3,3,3) → [2,4,4]  
- Remove two 4's: (4,4) → [2]  
- Can't remove single 2: not possible ⇒ Output -1.*  
However, if the numbers fit: suppose input was `nums=[2,3,3,2,2,4,2,3,4,4,4]`, output would be `4`.  

**Example 2:**  
Input: `nums = [2,1,2,2,3,3]`  
Output: `-1`  
*Explanation: Value 1 appears only once—you can't remove a single by any operation. Return -1.*

**Example 3:**  
Input: `nums = [1,1,1,1,1,1]`  
Output: `2`  
*Explanation: Six 1's: group as two sets of three, two operations needed: (1,1,1) + (1,1,1).*  


### Thought Process (as if you’re the interviewee)  

- **Initial idea:** Count the frequency of each value. For each frequency, figure out the minimum number of operations to remove them using only 2's and 3's at a time.
- **Brute-force:** Try all possible ways to group elements for each frequency using 2's and 3's — this leads to exponential combinations. Impractical for big inputs.
- **Greedy approach:**  
    - Always prefer removing three elements at a time (minimizes operation count).
    - For every value, check its frequency:
        - If frequency == 1: Impossible (cannot remove one alone).
        - For frequency ≥ 2:  
            - Try to use as many 3's as possible, then check for leftovers:
                - If remainder is 0: Done.
                - If remainder is 1: Instead of (x × 3, remainder=1), better to replace one group of 3's with two groups of 2 (since 2×2=4). That is,  
                    e.g., For count 7: 7÷3=2×3 +1, so ideally 1×3 +2×2. 
                - If remainder is 2: Just one group of 2 needed at the end.
    - Calculation is:
        - If frequency = 1: impossible.
        - If frequency % 3 == 0: ops = frequency ÷ 3
        - If frequency % 3 == 1: ops = (frequency-4) ÷ 3 + 2   (if frequency ≥ 4)
        - If frequency % 3 == 2: ops = (frequency-2) ÷ 3 + 1   (if frequency ≥ 2)
- **Why this approach?**  
  Because grouping as many 3's as possible always minimizes the operation count (combining 3×1 is always better than 2×1 + 1).

### Corner cases to consider  
- An element appears only once (impossible, result -1)
- Only two of an element (can remove in one operation)
- Exactly three of an element (one operation)
- n elements where n = 2k (can all be removed in pairs, but need to check that pairs are valid — must avoid unpaired leftovers)
- n < 2: can't remove if only one of any value
- Array is empty (already empty — zero operations)

### Solution

```python
def minOperations(nums):
    # Step 1: Count frequency of each value
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1

    ops = 0
    for val in freq:
        count = freq[val]
        if count == 1:
            # Impossible to remove a single occurrence
            return -1
        # Use as many 3's as possible first
        if count % 3 == 0:
            ops += count // 3
        elif count % 3 == 1:
            if count < 4:
                # Can't form groups, impossible
                return -1
            # (count-4)//3 groups of 3, then 2 groups of 2 for remainder 4
            ops += (count - 4) // 3 + 2
        else:  # count % 3 == 2
            # (count-2)//3 groups of 3, then 1 group of 2 for remainder 2
            ops += (count - 2) // 3 + 1
    return ops
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we loop through the array once to build the counter, and then over the distinct elements (≤ n) to compute the minimal operations.
- **Space Complexity:** O(n), for the frequency dictionary, in the worst case if all numbers are distinct.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can delete k equal elements (for any k ≥ 2) in each operation, not just 2 or 3?  
  *Hint: Generalize your grouping and greedy logic for k.*

- What is the minimal number of operations if elements can be removed even if they are not equal (e.g., any two or three elements)?  
  *Hint: Then just ceil(len(nums)/k) where k=2 or 3, etc.*

- How would you modify your approach if negative numbers or zeros were allowed as input?  
  *Hint: The algorithm still works; just frequency count by value regardless of sign.*

### Summary
We approached the problem as a **frequency-grouping and greedy decomposition** task. Grouping as many threes as possible (then twos as needed) guarantees the smallest number of steps by minimizing leftovers and maximizing batch removal per operation. This "frequency + greedy grouping" pattern is common for problems where you must partition counts into fixed blocks, applicable to coin change, grouping, and multiset partitioning tasks.


### Flashcard
For each value's frequency, greedily use as many 3's as possible, then 2's; if not possible, return –1.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Counting(#counting)

### Similar Problems
