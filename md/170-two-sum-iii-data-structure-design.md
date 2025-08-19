### Leetcode 170 (Easy): Two Sum III - Data structure design [Practice](https://leetcode.com/problems/two-sum-iii-data-structure-design)

### Description  
Design a data structure that can add a stream of integers and efficiently determine if any two numbers in the structure sum up to a given target value.  
Implement the following:
- **add(number):** Add the number to the data structure.
- **find(value):** Return True if any two distinct numbers sum to the value, otherwise return False.

### Examples  

**Example 1:**  
Input: `["TwoSum", "add", "add", "add", "find", "find"], [[], [1], [3], [5], [4], ]`  
Output: `[null, null, null, null, true, false]`  
Explanation:  
- `TwoSum twoSum = new TwoSum();`  
- `twoSum.add(1);`    # Current: [1]  
- `twoSum.add(3);`    # Current: [1, 3]  
- `twoSum.add(5);`    # Current: [1, 3, 5]  
- `twoSum.find(4);`   # 1 + 3 = 4 → returns `true`  
- `twoSum.find(7);`   # No pair sums up to 7 → returns `false`  

**Example 2:**  
Input: `["add", "add", "find"], [[1], [1], [2]]`  
Output: `[null, null, true]`  
Explanation:  
- Add 1 twice: [1, 1]  
- `find(2)` → 1 + 1 = 2, since 1 appears twice, returns `true`.  

**Example 3:**  
Input: `["add", "add", "find"], [[2], [3], ]`  
Output: `[null, null, false]`  
Explanation:  
- [2, 3] → no pair adds to 6, returns `false`.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Keep a list of numbers. To answer `find(value)`, check every pair: O(n²) time for each query. Too slow for repeated finds.
- **Optimize:**  
  Store counts of numbers in a hash map:
  - On `add(number)`: Increase its count.
  - On `find(value)`: For each unique number x, check if (value - x) exists:
    - If x ≠ value - x, just need both numbers to exist.
    - If x == value - x, need count[x] ≥ 2.
- **Trade-offs:**  
  - Space: Need O(n) for the hash map.
  - `add`: O(1) each time.  
  - `find`: O(n), but much faster than brute-force.

### Corner cases to consider  
- Data structure is empty, and `find` is called.
- Add the same element multiple times and look for their sum (e.g., add(1), add(1), find(2)).
- `find` with a value that is less or greater than twice the min/max present.
- Adding negative and zero values.

### Solution

```python
class TwoSum:
    def __init__(self):
        # Use a dictionary to store the count of each number
        self.counts = {}

    def add(self, number: int) -> None:
        # Increment the count for this number
        if number in self.counts:
            self.counts[number] += 1
        else:
            self.counts[number] = 1

    def find(self, value: int) -> bool:
        # For each unique num in the structure
        for num in self.counts:
            complement = value - num
            if complement == num:
                # Need at least two occurrences of num
                if self.counts[num] >= 2:
                    return True
            else:
                if complement in self.counts:
                    return True
        return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `add`: O(1) per operation (dictionary insert/update).
  - `find`: O(n), where n is the number of unique numbers added.
- **Space Complexity:**  
  - O(n), where n is the number of unique numbers stored by the data structure.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are far more `find` calls than `add` calls?  
  *Hint: Precompute all possible pairs and store them in a set for O(1) find.*

- What if all numbers are between a small fixed range (like 0 to 100)?  
  *Hint: Consider using an array for faster access instead of a hash map.*

- Can your solution handle concurrency (multiple threads calling add/find)?  
  *Hint: Look into thread-safe maps or locking.*

### Summary
This problem leverages the **hash map counting** pattern: storing and looking up counts of elements for efficient pairwise sum checks. It appears frequently in "Two Sum"-style problems and is a classic for practicing trade-offs between brute-force and optimized hash map solutions. The pattern can be applied for problems needing quick checks for unions or pairs, and when working with frequency-based queries.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Design(#design), Data Stream(#data-stream)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Unique Word Abbreviation(unique-word-abbreviation) (Medium)
- Two Sum IV - Input is a BST(two-sum-iv-input-is-a-bst) (Easy)