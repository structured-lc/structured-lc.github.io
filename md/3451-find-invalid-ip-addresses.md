### Leetcode 3451 (Hard): Find Invalid IP Addresses [Practice](https://leetcode.com/problems/find-invalid-ip-addresses)

### Description  
Given a log table with IP addresses (as strings), find all **invalid IPv4 addresses** and return a list of each invalid IP along with its count, ordered by count (descending) then IP (descending).  
An IPv4 address is **invalid** if **any of the following are true**:
- It does **not** contain exactly 3 dots ("`.`").
- Any octet (the parts between dots) is not an integer in [0, 255].
- Any octet starts with a `'0'` and is more than one digit (e.g., "001").
- Octets are not numbers.

### Examples  

**Example 1:**  
Input:  
`["192.168.0.1","256.100.50.25","1.01.1.1","a.1.1.1","10.10.10.10","10.10.10.10","256.100.50.25"]`  
Output:  
`[["256.100.50.25",2],["a.1.1.1",1],["1.01.1.1",1]]`  
*Explanation:*
- `"256.100.50.25"`: invalid (first octet is 256 > 255). Appears 2 times.
- `"a.1.1.1"`: invalid ("a" is not a number).
- `"1.01.1.1"`: invalid (second octet "01" starts with 0).
- `"10.10.10.10"`: valid.

**Example 2:**  
Input:  
`["1.2.3.4","01.2.3.4","1.02.3.4","1.2.03.4","1.2.3.04","256.2.3.4"]`  
Output:  
`[["256.2.3.4",1],["1.2.3.04",1],["1.2.03.4",1],["1.02.3.4",1],["01.2.3.4",1]]`  
*Explanation:*
- `"1.2.3.4"`: valid.
- Others: invalid due to starting zeros or invalid range.

**Example 3:**  
Input:  
`["...","192.168.1","192.168.1.1.1","300.1.1.1"]`  
Output:  
`[["300.1.1.1",1],["192.168.1.1.1",1],["192.168.1",1],["...",1]]`  
*Explanation:*
- `"..."`: invalid (no numbers).
- `"192.168.1"`: invalid (too few octets).
- `"192.168.1.1.1"`: invalid (too many octets).
- `"300.1.1.1"`: invalid (first octet 300 > 255).


### Thought Process (as if you’re the interviewee)  
To solve this, I need to check **each IP string** for validity by following the rules.
- **Brute-force:** For each IP, split by "`.`"; if not 4 parts, it's invalid.
- For each octet:
    - Must only contain digits, no leading zeros (unless the number is "0").
    - Integer value must be 0 ≤ octet ≤ 255.
- I will use a `defaultdict` to count invalid IPs.
- At the end, return sorted list by count desc, then IP desc.
- This approach is O(n × k), where n is the number of logs and k is string length per IP.

**Why this approach:**  
- Direct rule simulation ensures accuracy; regex-based validation is possible but simulation/interview-style code is clearer.
- Counting and sorting is straightforward.
- Tradeoff: Using Python loop and parsing instead of regex for clarity and stepwise explanation.


### Corner cases to consider  
- Empty strings: "" is invalid.
- Octets with non-digit characters: "a.1.1.1" or "1.1.1.a".
- Multiple dots: "1.1..1", "1.1.1.1.1", "..."
- Numbers out of range: "256.1.1.1", "-1.1.1.1"
- Leading zeros: "01.2.3.4"
- Trailing/leading spaces: " 1.2.3.4"
- Mixed cases and repeats in log.
- Count identical invalid IPs correctly.


### Solution

```python
from collections import defaultdict

def find_invalid_ip_addresses(ip_list):
    def is_invalid(ip):
        parts = ip.split('.')
        # Must have exactly 4 parts (i.e., exactly 3 dots)
        if len(parts) != 4:
            return True
        for part in parts:
            # Non-digit or empty part is invalid
            if not part.isdigit():
                return True
            # Leading zero check (except for "0" itself)
            if len(part) > 1 and part[0] == '0':
                return True
            # Out of range [0, 255]
            num = int(part)
            if not (0 <= num <= 255):
                return True
        return False

    invalid_counter = defaultdict(int)
    # Count invalid IPs
    for ip in ip_list:
        if is_invalid(ip):
            invalid_counter[ip] += 1

    # Prepare result: sort by count desc, then IP desc lex
    result = sorted(
        invalid_counter.items(),
        key=lambda x: (-x[1], -tuple(ord(ch) for ch in x[0]))
    )
    # Format result as required: [[ip, count], ...]
    return [[ip, count] for ip, count in result]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n = number of IPs, k = average length of IP. Splitting and scanning each string is O(k); counting and final sort is O(m log m) where m = number of unique invalid IPs.
- **Space Complexity:** O(m), where m = number of unique invalid IPs (for the counter and result). No recursion or extra data structure beyond dictionary and output.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input list is extremely large and doesn't fit in memory?  
  *Hint: Can you do a streaming or chunked processing and aggregate results afterward?*

- How would you validate IPv6, or both IPv4/IPv6 together?  
  *Hint: Design a function that can handle different IP formats, possibly using regex or more advanced parsing.*

- Return only top-K most frequent invalid IPs?  
  *Hint: Can you optimize counting/sorting with a heap or other selection structure?*

### Summary
This problem is a **simulation + counting** problem, following validation/parsing rules.  
The code uses **pattern matching, counting, and custom sorting**—a very common approach for data cleaning or QA on input logs. Such logic is often used in network security, backend services, and system monitoring, and requires careful attention to parsing and validation edge cases.