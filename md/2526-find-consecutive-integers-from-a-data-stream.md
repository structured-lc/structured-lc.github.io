### Leetcode 2526 (Medium): Find Consecutive Integers from a Data Stream [Practice](https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream)

### Description  
We need to design a data structure for a stream of integers that can efficiently detect if the most recent k numbers in the stream are all equal to a specified value.  
- When the data structure is initialized, you receive integers value and k.
- For each new number arriving (`consec(num)`), add it to the stream and answer whether the last k consecutive numbers are all equal to `value`.
- The stream size is unbounded, so storing all numbers is impractical—efficiency in both time and space is critical.

### Examples  

**Example 1:**  
Input:  
```
DataStream ds = new DataStream(4, 3)
ds.consec(4)        # Output=False
ds.consec(4)        # Output=False
ds.consec(4)        # Output=True
ds.consec(3)        # Output=False
```
Explanation:  
- The stream has to check whether the latest 3 numbers are all 4.
- First and second calls: Only one/two 4’s have been seen in a row.
- Third call: Three consecutive 4’s seen ⇒ True.
- Fourth call: 3 is not 4 ⇒ resets ⇒ False.

**Example 2:**  
Input:  
```
DataStream ds = new DataStream(2, 2)
ds.consec(1)        # Output=False
ds.consec(2)        # Output=False
ds.consec(2)        # Output=True
ds.consec(2)        # Output=True
ds.consec(1)        # Output=False
```
Explanation:  
- We look for 2 consecutive 2’s at every step.
- Sequence: [1], [1, 2], [1, 2, 2], continues.
- Only from third call onwards do we get two consecutive 2’s.

**Example 3:**  
Input:  
```
DataStream ds = new DataStream(10, 1)
ds.consec(5)         # Output=False
ds.consec(10)        # Output=True
ds.consec(10)        # Output=True
```
Explanation:  
- With k=1, any single value equals the target means True.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Simply store all the incoming numbers. For each call to `consec`, look at the last k elements in the list and check if they all equal value.  
  - Time: O(k) per query  
  - Space: O(n); not scalable due to potentially infinite stream.

- **Optimized Approach:**  
  Since only the last k numbers ever matter, don’t need full storage. Instead, maintain a running counter of consecutive matching numbers.  
  - For each input `num`:
    - If `num` == value: increment the count.
    - Else: reset count to 0.
    - Return True if count ≥ k, else False.  
  This avoids any queue or array, keeping time and space O(1). No risk of overflow, so safe and optimal.

- **Why prefer this?**  
  - Only O(1) memory, O(1) time per query
  - Avoids sliding window/queue
  - Simple and elegant

### Corner cases to consider  
- k = 1 (check works for smallest window)
- Stream never reaches length k
- Values in the stream jump between value and other numbers
- Stream is very long (ensure no memory leak)
- When same number comes, but not consecutively
- Negative numbers, zeros, or extreme values

### Solution

```python
class DataStream:
    def __init__(self, value: int, k: int):
        # Initialize with target value, required window k, and running count
        self.value = value
        self.k = k
        self.consec_count = 0

    def consec(self, num: int) -> bool:
        # If current num equals target, increment count, else reset
        if num == self.value:
            self.consec_count += 1
        else:
            self.consec_count = 0
        # Return True if we've seen k or more consecutive value’s
        return self.consec_count >= self.k
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(1) per `consec` call, as only a simple arithmetic operation is performed.

- **Space Complexity:**  
  O(1), only a few integer fields (no stream storage, no array/queue).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you track if any number (not just a fixed value) occurs k times consecutively in the stream?  
  *Hint: Need to store the last seen value in addition to a counter.*

- What if you wanted to support querying for arbitrary k, not just the initially set k?  
  *Hint: Need to use a queue or circular buffer to support variable window sizes.*

- How would you make this work in a multi-threaded (concurrent) scenario?  
  *Hint: Must handle shared state for counter updates, consider locks or atomic operations.*

### Summary
This problem uses the **“consecutive counter”** or **stateful tracking pattern**—an O(1) space, O(1) update approach for sliding-window questions where only matches (not the entire window) matter.  
It’s highly efficient for stream processing and commonly appears when you need to spot runs of identical/fixed values, or detect breaches in sequence.  
Related problems: longest consecutive sequence, sliding window all-equal or majority element detection, and event debouncing.

### Tags
Hash Table(#hash-table), Design(#design), Queue(#queue), Counting(#counting), Data Stream(#data-stream)

### Similar Problems
- Number of Zero-Filled Subarrays(number-of-zero-filled-subarrays) (Medium)