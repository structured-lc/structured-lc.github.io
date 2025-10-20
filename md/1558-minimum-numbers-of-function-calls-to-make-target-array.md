### Leetcode 1558 (Medium): Minimum Numbers of Function Calls to Make Target Array [Practice](https://leetcode.com/problems/minimum-numbers-of-function-calls-to-make-target-array)

### Description  
Given an array of integers `nums`, you have to create `nums` starting from an array of zeroes by performing two possible operations:
- **Increment:** Pick any index and increment its value by 1.
- **Double:** Double the value of every element in the array at once.

Return the **minimum number of operations** required to make the zero array equal to `nums`.

### Examples  

**Example 1:**  
Input: `nums = [1,5]`  
Output: `5`  
*Explanation:  
- Increment index 1: [0,0] → [0,1]  (1 op)  
- Double: [0,1] → [0,2] → [0,4]  (2 ops)  
- Increment index 0: [0,4] → [1,4]  (1 op)  
- Increment index 1: [1,4] → [1,5]  (1 op)  
Total: 1 + 2 + 1 + 1 = 5.*

**Example 2:**  
Input: `nums = [2,2]`  
Output: `3`  
*Explanation:  
- Increment index 0: [0,0] → [1,0]  
- Increment index 1: [1,0] → [1,1]  
- Double: [1,1] → [2,2]  
Total: 2 + 1 = 3.*

**Example 3:**  
Input: `nums = [3,8,2]`  
Output: `6`  
*Explanation:  
- Increments (for set bits): [0,0,0] → [1,0,0] → [1,0,1] → [1,1,1]  
- Doubles (for max bit length): [1,1,1] → [2,2,2] → [4,4,4] → [8,8,8]  
- Add increments at the right times to reach [3,8,2] in 6 ops.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to simulate every possibility of doubling and incrementing, choosing at each step. But that’s exponentially slow.

Optimizing:  
- Every '1' in any number’s binary representation means a single increment must have happened at that bit position.
- Every doubling corresponds to a left-shift of all numbers. So, the number of doublings needed is determined by the highest bit in the *largest* number.
- Therefore, for each element, count the number of '1's (increment ops), and for the entire array, only care about the largest power of 2 (doubling ops) required.
- Total operations = (sum of all increments needed for all numbers) + (max number of doublings needed for any number).

Trade-off: This approach is O(n), only requires simple bitwise operations, and avoids unnecessary simulation.

### Corner cases to consider  
- Empty array (`nums = []`) → 0 operations.
- All elements are zeroes.
- Single element.
- Large numbers (test bit counting and handling of big integers).
- All numbers are powers of two.
- Duplicate values.
- Mixed small and large numbers.

### Solution

```python
def min_operations(nums):
    max_bits = 0     # Track the largest bit-length needed for doubling
    total_increments = 0  # Total number of increment (set bits) for all nums

    for num in nums:
        bit_count = 0
        t = num
        while t > 0:
            if t & 1:  # If the lowest bit is set, increment needed
                bit_count += 1
            t //= 2
        total_increments += bit_count
        if num > 0:
            bits_needed = num.bit_length()
            max_bits = max(max_bits, bits_needed)
    # We need (max_bits - 1) doubling operations, since 0 doubled any times is still 0.
    return total_increments + (max_bits - 1 if max_bits > 0 else 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log K), where n = len(nums), K = max(nums). Each number is processed in O(log K) time during bit counting and length check.
- **Space Complexity:** O(1), only a fixed number of variables used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the starting array isn’t all zeroes?
  *Hint: How would you adapt the approach if some elements are non-zero?*

- Can you optimize further if only increments or only doubles are allowed at any step?
  *Hint: What does the problem reduce to if only one operation is permitted?*

- What if you can only double subarrays, not the entire array?
  *Hint: How would you split and conquer?*

### Summary
This problem is a great example of using binary representation and greedy thinking to minimize operations, mapping the increments and doubles to set bits and maximal bit length. It’s a classic pattern in problems involving operations on all elements (bitwise, digit DP, minimum steps problems). The bitwise decomposition can also be applied in other problems requiring “building up” numbers via allowed operations.


### Flashcard
Count total 1-bits across all numbers (increments needed) plus max bit position of largest number (doublings needed); greedy binary representation insight.

### Tags
Array(#array), Greedy(#greedy), Bit Manipulation(#bit-manipulation)

### Similar Problems
