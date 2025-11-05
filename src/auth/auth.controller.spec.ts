import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest
              .fn()
              .mockReturnValue({ access_token: 'mock-jwt-token' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.login and return a token', () => {
    const mockUser = { id: 1, username: 'test' };
    const mockLoginDto = { username: 'test', password: 'password' }; // entspricht LoginDto
    const result = controller.login({ user: mockUser }, mockLoginDto);
    expect(authService.login).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({ access_token: 'mock-jwt-token' });
  });
});
