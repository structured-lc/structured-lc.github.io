### Leetcode 1826 (Easy): Faulty Sensor [Practice](https://leetcode.com/problems/faulty-sensor)

### Description  
Given readings from two sensors—**sensor1** and **sensor2**—that are measuring the same phenomenon, you're told that *at most one* of them is faulty. If one sensor is faulty, it missed one value in the sequence and its last value is corrupted (i.e., it doesn't match any real reading and the missing value does not equal the replaced one). Your task: Determine if it’s possible to tell which sensor is faulty.  
Return **1** if sensor1 is faulty, **2** if sensor2 is faulty, else **-1** if it is impossible to determine.

### Examples  

**Example 1:**  
Input: `sensor1 = [2,3,4,5]`, `sensor2 = [2,1,3,4]`  
Output: `1`  
*Explanation: The correct sequence is `[2,1,3,4]`. Dropping the second element from sensor2 aligns the rest. Sensor1 skipped a value (the `1`) and ended with an extra value `5`.*

**Example 2:**  
Input: `sensor1 = [2,2,2,2,2]`, `sensor2 = [2,2,2,2,5]`  
Output: `-1`  
*Explanation: Dropping the last value from either sensor could match with the other, so it's not possible to determine which sensor is faulty.*

**Example 3:**  
Input: `sensor1 = [2,3,2,2,3,2]`, `sensor2 = [2,3,2,3,2,7]`  
Output: `2`  
*Explanation: Sensor1 has the correct read. If sensor2 skipped the fourth value (`2`), replacing its last value with a wrong `7`, both sequences would align except for the end. So sensor2 is faulty.*

### Thought Process (as if you’re the interviewee)  

The brute-force approach is to try every possible skip in both sensors to align the remaining sequences, but since only one sensor can be faulty and only one value is skipped, we need a more focused solution.

- Start iterating until you find the first index `i` where `sensor1[i]` ≠ `sensor2[i]`.
- At that point, try skipping one element in either sensor:
    - If after skipping `sensor1[i]`, the rest of `sensor1` matches `sensor2` from `i` onward, sensor1 is faulty (return 1).
    - If after skipping `sensor2[i]`, the rest of `sensor2` matches `sensor1` from `i` onward, sensor2 is faulty (return 2).
    - If the rest matches regardless of which you skip, return -1 as it's impossible to tell.
- If you reach the end with no difference, return -1 as they are identical.

This is efficient because we perform at most 2 simple sequence checks after the first mismatch.

### Corner cases to consider  
- Arrays are already identical (can't tell, return -1).
- Both sequences are all the same number: can't differentiate faulty sensor.
- The first difference is at the very last value.
- Last value differs but skipping at previous position aligns everything.
- Multiple mismatches (shouldn't occur per constraints).
- Only one element in arrays (should always return -1).

### Solution

```python
def badSensor(sensor1, sensor2):
    n = len(sensor1)
    # Find first position where sensors differ
    for i in range(n):
        if sensor1[i] != sensor2[i]:
            # Check if skipping sensor1[i] aligns sensor1[i+1:] == sensor2[i:]
            is_sensor1_faulty = True
            for j in range(i, n-1):
                if sensor1[j+1] != sensor2[j]:
                    is_sensor1_faulty = False
                    break
            # Check if skipping sensor2[i] aligns sensor2[i+1:] == sensor1[i:]
            is_sensor2_faulty = True
            for j in range(i, n-1):
                if sensor2[j+1] != sensor1[j]:
                    is_sensor2_faulty = False
                    break

            if is_sensor1_faulty and not is_sensor2_faulty:
                return 1
            if is_sensor2_faulty and not is_sensor1_faulty:
                return 2
            # Both or neither — ambiguous
            return -1
    # No differences found
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since at most we make two single passes along the remainder of the arrays starting at the first difference.
- **Space Complexity:** O(1), as only a few variables are used for looping and status-checking. No extra data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if more than one value can be missed or corrupted in a faulty sensor?  
  *Hint: How would you track and compare multiple skips or swaps?*

- If both sensors can potentially be faulty, how could you detect both errors?  
  *Hint: Is there a way to distinguish errors when both have issues, or is more information needed?*

- How would you handle if sensor readings are coming in as a stream, not arrays?  
  *Hint: Think about rolling comparison and state management as you receive readings.*

### Summary

This problem is a **two-pointer comparison** with an early escape at the first sign of difference. The pattern applies to problems verifying arrays/sequences with a single questionable mutation or deletion and can be used in stream validation and typo/shift detection tasks. The code structure avoids unnecessary work by stopping at the first misalignment and only considers single skips, as permitted by the problem constraints.


### Flashcard
Find first mismatch index i; check if sensor1[i+1:] equals sensor2[i:] (sensor1 faulty) or sensor1[i:] equals sensor2[i+1:] (sensor2 faulty); return −1 if both match.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
