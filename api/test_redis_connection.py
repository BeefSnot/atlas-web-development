import redis

def test_redis_connection(socket_path):
    try:
        # Connect to Redis server
        client = redis.Redis(unix_socket_path=socket_path)
        
        # Test setting a value
        client.set("test_key", "test_value")
        
        # Test getting the value
        value = client.get("test_key")
        
        # Print the result
        if value:
            print(f"Connection successful! Retrieved value: {value.decode('utf-8')}")
        else:
            print("Failed to retrieve value.")
        
        # Clean up
        client.delete("test_key")
        
    except redis.ConnectionError as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_redis_connection("/home/dynastyhosting/.redis/redis.sock")